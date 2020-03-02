<template>
    <div class="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4"> 
        <div class="flex-1 bg-gray-200 rounded-lg overflow-hidden shadow shadow-inner">
            <div class="px-6 pt-4 pb-1">
                <div class="font-bold text-xl mb-2">Create a new note!</div>
                <p class="text-gray-700 text-base">
                    Start new note by clicking <a @click="createNewNote" class="cursor-pointer lato-bold underline">HERE</a>.
                </p>
            </div>
        </div>
        <div @click="selectNote(note)" v-for="note in notes" :key="note.id" class="modal-open bg-white rounded-lg cursor-pointer shadow-lg inline-block relative hover:shadow-2xl transition duration-200" >
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

        <!--Modal-->
        <div class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div class="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"></div>
            
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

            <!-- Add margin if you want to see some of the overlay behind the modal-->
            <div v-if="editNote" class="modal-content py-4 text-left px-6">
                <!--Title-->
                <div class="flex justify-between items-center pb-3">
                <p class="text-2xl font-bold">{{ editNote.title }}</p>
                <div @click="toggleModal()" class="modal-close cursor-pointer z-50">
                    <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                </div>
                </div>

                <!--Body-->
                <p>{{ editNote.content }}</p>

                <!--Footer-->
                <div class="flex justify-end pt-2">
                <button class="py-2 px-4 bg-transparent rounded-lg text-teal-600 hover:bg-gray-100 hover:text-teal-500 mr-2">Action</button>
                <button @click="toggleModal()" class="modal-close bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg">Close</button>
                </div>
                
            </div>
            </div>
        </div>

    </div>
</template>

<script>
import moment from 'moment'
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'Home',
    props: ['name'],
    data() {
        return {
            notes: [],
            editNote: null
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
            this.toggleModal()
        },
        toggleModal () {
            const body = document.querySelector('body')
            const modal = document.querySelector('.modal')
            modal.classList.toggle('opacity-0')
            modal.classList.toggle('pointer-events-none')
            body.classList.toggle('modal-active')
        }
    },
    mounted() {
        let openmodal = document.querySelectorAll('.modal-open')
        
        const overlay = document.querySelector('.modal-overlay')
        overlay.addEventListener('click', this.toggleModal)
        
        document.onkeydown = function(evt) {
            evt = evt || window.event
            let isEscape = false
            if ("key" in evt) {
                isEscape = (evt.key === "Escape" || evt.key === "Esc")
            } else {
                isEscape = (evt.keyCode === 27)
            }
            if (isEscape && document.body.classList.contains('modal-active')) {
                this.toggleModal()
            }
        }
    }
}
</script>

<style>
</style>