<template>
    <div class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div class="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"></div>
        <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div v-if="editNote" class="modal-content py-4 text-left px-6">
                <!--Title-->
                <div class="flex justify-between items-center pb-3">
                    <input @change="updateNote(editNote)" type="text" role="textbox" class="outline-none text-2xl font-bold" v-model="editNote.title" />
                    <div @click="toggleModal()" class="modal-close cursor-pointer z-50">
                        <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                    </div>
                </div>
                <!--Body-->
                <textarea @change="updateNote(editNote)" role="textbox" type="text" class="w-full outline-none h-64" v-model="editNote.content" />
                <!--Footer-->
                <div class="flex justify-end pt-2">
                    <button @click="deleteNote(editNote)" :class="[editNote.color ? `text-${editNote.color}-600 hover:text-${editNote.color}-500` : 'text-teal-600 hover:text-teal-500',]" class="py-2 px-4 bg-transparent rounded-lg hover:bg-gray-100 mr-2">Delete</button>
                    <button @click="toggleModal()" :class="[editNote.color ? `bg-${editNote.color}-500 hover:bg-${editNote.color}-600` : 'bg-teal-500 hover:bg-teal-600',]" class="modal-close text-white font-bold py-2 px-4 rounded-lg">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'noteModal',
    props: ['editNote'],
    data() {
        return {
        }
    },
    methods: {
        toggleModal() {
            const body = document.querySelector('body')
            const modal = document.querySelector('.modal')
            modal.classList.toggle('opacity-0')
            modal.classList.toggle('pointer-events-none')
            body.classList.toggle('modal-active')
        },
        deleteNote(note) {
            db.collection("notes").doc(note.id).delete().then(function() {

            }).catch(function(error) {
                console.error(error)
            })
            this.toggleModal()
            this.$emit('reload-data')
        },
        updateNote(note) {
            db.collection("notes").doc(note.id).update({
                title: note.title,
                content: note.content,
                dateModified: Date.now()
            })
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