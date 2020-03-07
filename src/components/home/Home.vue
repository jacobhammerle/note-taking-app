<template>
    <div>
        <div class="flex justify-between">
            <div class="ml-4 mb-4 md:w-3/6 sm:w-4/6 xs:w-5/6">
                <input v-on:keyup="searchTimeOut()" class="w-full bg-white outline-none shadow-md focus:shadow-lg transition duration-200 rounded-lg py-2 px-8 mb-2 h-12" placeholder="search by note title..." type="text" name="search" v-model="search" />
            </div>
            <div class="mr-4 mb-4">
                <Btn @click="createNewNote">Create Note</Btn>
            </div>
        </div>
        <div v-if="!emptySearch" class="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4">
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
        <div v-else class="w-full text-center p-8 md:text-lg sm:text-md">
            no notes were found
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import db from '@/firebase/init'
import firebase from 'firebase'
import Toast from '@/components/common/Toast'
import NoteModal from '@/components/NoteModal'
import Btn from '@/components/common/Btn'
export default {
    name: 'Home',
    props: ['name'],
    components: {
        Toast,
        NoteModal,
        Btn
    },
    data() {
        return {
            notes: [],
            editNote: null,
            search: null,
            emptySearch: false,
            toastMessage: 'Note Deleted'
        }
    },
    created() {
        let ref = db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').orderBy("timestamp", "desc")

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
            this.$children[2].toggleModal()
        },
        searchTimeOut() { 
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(() => {
                this.notes = []

                let ref = db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').orderBy('title').startAt(this.search).endAt(this.search + "\uf8ff")
                ref.onSnapshot(snapshot => {
                    if(snapshot.empty){
                        this.emptySearch = true
                    }else{
                        this.emptySearch = false
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
                    }
                })
            }, 400);
        },
        reloadData() {
            this.$children[0].toast()
            this.notes = []
            
            let ref = db.collection('users').doc(firebase.auth().currentUser.email).collection('notes')
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