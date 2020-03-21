<template>
    <div class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div class="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"></div>
        <div v-if="editNote" class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div class="modal-content py-4 text-left px-6">
                <!--Title-->
                <div class="flex justify-between items-center pb-3">
                    <Editable class="text-2xl font-bold" v-bind:value="editNote.title" @input="onUpdateNoteTitle" />
                    <div @click="toggleModal()" class="modal-close cursor-pointer z-50">
                        <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                    </div>
                </div>
                <!--Body-->
                <div v-if="editNote.type == 1 || !editNote.type">
                    <Editable id="content" v-bind:value="editNote.content" @input="onUpdateNoteContent" />
                </div>
                <div v-else class="pb-2">
                    <div v-for="(item, index) in editNote.list" class="text-gray-700 flex p-1 cursor-pointer rounded-md hover:bg-gray-200">
                        <input type="checkbox" @change="checkItem(index, item)" v-model="item.completed" class="flex-start flex-shrink-0 cursor-pointer self-start rounded-sm h-4 w-4 mt-2 ml-1 mr-2">
                        <div class="flex-auto">
                            <Editable class="focus:bg-white rounded-md px-2 py-1" v-bind:value="item.text" v-bind:index="index" @change="onUpdateListItem" />
                        </div>
                        <div class="flex-end self-start mt-1 ml-3 mr-2">
                           <i @click="deleteItem(index)" class="far fa-trash-alt text-md hover:text-red-600"></i>
                        </div>
                    </div>
                    <button class="mb-4 ml-2 mt-2 rounded-md bg-gray-300 text-gray-700 px-2 py-1 hover:bg-gray-400 focus:outline-none" @click="addRow()">Add an item</button>
                </div>
                <!--Footer-->
                <div class="flex justify-end pt-2">
                    <button @click="deleteNote(editNote)" :class="[editNote.color ? `text-${editNote.color}-600 hover:text-${editNote.color}-500 hover:bg-gray-100` : 'text-teal-600 hover:text-teal-500 hover:bg-gray-100',]" class="mr-2 py-2 px-4 rounded-lg">Delete</button>
                    <button @click="toggleModal()" :class="[editNote.color ? `bg-${editNote.color}-500 hover:bg-${editNote.color}-600` : 'bg-teal-500 hover:bg-teal-600',]" class="modal-close text-white font-bold py-2 px-4 rounded-lg">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import Editable from '@/components/common/Editable'
export default {
    name: 'noteModal',
    props: ['editNote'],
    components: {
        Editable
    },
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
        checkItem(index, item) {
            this.editNote.list[index] = { text: item.text, completed: item.completed }
            db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').doc(this.editNote.id).update({
                list: this.editNote.list,
                dateModified: Date.now()
            })
        },
        addRow() {
            this.editNote.list.push({ text: '', completed: false })
        },
        deleteNote(note) {
            db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').doc(note.id).delete().then(function() {

            }).catch(function(error) {
                console.error(error)
            })
            this.toggleModal()
            this.$emit('reload-data')
            this.$emit('delete')
        },
        deleteItem(index) {
            this.editNote.list.splice(index, 1)
            db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').doc(this.editNote.id).update({
                list: this.editNote.list,
                dateModified: Date.now()
            })
        },
        onUpdateNoteContent(newContent) {
            this.editNote.content = newContent;
            db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').doc(this.editNote.id).update({
                content: this.editNote.content,
                dateModified: Date.now()
            })
        },
        onUpdateListItem(data) {
            this.editNote.list[data.index] = { text: data.text }
            db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').doc(this.editNote.id).update({
                list: this.editNote.list,
                dateModified: Date.now()
            })
        },
        onUpdateNoteTitle(newTitle){
                this.editNote.title = newTitle;
                db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').doc(this.editNote.id).update({
                    title: this.editNote.title,
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