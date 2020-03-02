<template>
    <div>
        <div class="mx-auto mb-4 w-3/6">
            <input @change="searchNotes()" class="w-full bg-white outline-none shadow-md focus:shadow-lg transition duration-200 rounded-full py-2 px-8 mb-2 h-12" placeholder="search..." type="text" name="search" v-model="search" />
        </div>
        <div class="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4"> 
            <div class="flex-1 bg-gray-200 rounded-lg overflow-hidden shadow shadow-inner pb-4">
                <div class="px-6 pt-4 pb-1">
                    <div class="font-bold text-xl mb-2">Create a new note!</div>
                    <p class="text-gray-700 text-base">
                        Start new note by clicking <a @click="createNewNote" class="cursor-pointer lato-bold underline">HERE</a>.
                    </p>
                </div>
            </div>
            <div @click="selectNote(note)" v-for="note in notes" :key="note.id" class="modal-open bg-white rounded-lg cursor-pointer shadow-lg inline-block relative hover:shadow-2xl transition duration-200">
                <div class="px-6 pt-4 pb-16">
                    <div class="font-bold text-xl mb-2">{{note.title}}</div>
                    <p class="text-gray-700 text-base">
                        {{note.content}}
                    </p>
                </div>
                <div class="absolute bottom-0 w-full px-6 pb-4 pt-3">
                    <div class="flex justify-between">
                        <div class="inline-block lato-light text-xs">
                            {{note.timestamp}}
                        </div>
                        <div class="inline-block">
                            <span :class="[note.color ? `bg-${note.color}-500` : 'bg-gray-200',]" class="block rounded-full h-4 w-4"></span>
                        </div>
                    </div>
                </div>
            </div>

            <!--Toast-->
            <Toast v-bind:message="toastMessage" />
            <!--Modal-->
            <NoteModal v-bind:edit-note="editNote" @reload-data="reloadData" />
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import db from '@/firebase/init'
import firebase from 'firebase'
import Toast from '@/components/common/Toast'
import NoteModal from '@/components/NoteModal'
export default {
    name: 'Home',
    props: ['name'],
    components: {
        Toast,
        NoteModal
    },
    data() {
        return {
            notes: [],
            editNote: null,
            search: null,
            toastMessage: 'Note Deleted'
        }
    },
    created() {
        let ref = db.collection('notes').where("uid", "==", firebase.auth().currentUser.uid)

        // .orderBy("timestamp", "desc")

        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    let doc = change.doc
                    this.notes.push({
                        id: doc.id,
                        title: doc.data().title,
                        content: doc.data().content,
                        color: doc.data().color,
                        timestamp: moment(doc.data().timestamp).format('lll')
                    })
                }
            })
        })
    },
    methods: {
        createNewNote() {
            this.$router.push({ name: "NewNote" })
        },
        selectNote(note) {
            this.editNote = note
            this.$children[1].toggleModal()
        },
        searchNotes() {
            // search notes
        },
        reloadData() {
            this.$children[0].toast()
            this.notes = []
            
            let ref = db.collection('notes').where("uid", "==", firebase.auth().currentUser.uid)
            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type == 'added'){
                        let doc = change.doc
                        this.notes.push({
                            id: doc.id,
                            title: doc.data().title,
                            content: doc.data().content,
                            color: doc.data().color,
                            timestamp: moment(doc.data().timestamp).format('lll')
                        })
                    }
                })
            })
        }
    }
}
</script>

<style>
</style>