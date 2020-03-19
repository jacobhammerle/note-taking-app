<template>
    <div class="w-full p-4">
        <div class="pb-8">
            <a href="/home" class="cursor-pointer text-gray-500 hover:underline">return back home</a>
        </div>
        <div>
            <label class="block py-3 lato-bold" for="new-message">Title</label>
            <div class="flex justify-between">
                <div class="flex-1 pr-2">
                    <input class="w-full outline-none shadow rounded-lg p-4 mb-2" type="text" name="title" v-model="newTitle" />
                </div>
                <div class="flex justify-center items-center">
                    <div>
                        <span @click="selectColor('red')" class="color border-gray-100 border-solid border-2 inline-block cursor-pointer bg-red-500 rounded-full h-6 w-6 mr-1"></span>
                        <span @click="selectColor('orange')" class="color border-gray-100 border-solid border-2 inline-block cursor-pointer bg-orange-500 rounded-full h-6 w-6 mr-1"></span>
                        <span @click="selectColor('yellow')" class="color border-gray-100 border-solid border-2 inline-block cursor-pointer bg-yellow-500 rounded-full h-6 w-6 mr-1"></span>
                        <span @click="selectColor('green')" class="color border-gray-100 border-solid border-2 inline-block cursor-pointer bg-green-500 rounded-full h-6 w-6 mr-1"></span>
                        <span @click="selectColor('blue')" class="color border-gray-100 border-solid border-2 inline-block cursor-pointer bg-blue-500 rounded-full h-6 w-6 mr-1"></span>
                    </div>
                </div>
            </div>
        </div>
        <ul class="flex max-w-xl mx-auto my-4">
            <li class="flex-1 mr-2">
                <a @click="toggleDisplay" id="note-tab" class="text-center block rounded py-2 px-4 cursor-pointer active">Note</a>
            </li>
            <li class="flex-1 mr-2">
                <a @click="toggleDisplay" id="list-tab" class="text-center block rounded py-2 px-4 cursor-pointer in-active">List</a>
            </li>
        </ul>
        <div v-if="displayNote">
            <div>
                <label class="block py-3 lato-bold" for="new-note">Content</label>
                <textarea class="w-full outline-none shadow rounded-lg p-4 h-64 mb-8 leading-relaxed" type="text" name="content" v-model="newContent" />
            </div>
            <div>
                <Btn @click="createNote">Create Note</Btn>
            </div>
        </div>
        <div v-if="!displayNote">
            <label class="block py-3 lato-bold" for="new-list">List</label>
            <ul id="list"> 
                <li v-for="(item, index) in list" :key="item.id" class="flex justify-between shadow rounded-lg bg-white p-4 mb-2">
                    <input :id="index" class="w-full outline-none" type="text" v-model="item.text" @keyup.enter="addRowFromEnter(index)" @change="updateListItem(item, index)" />
                    <i @click="deleteRow(index)" class="far fa-trash-alt float-right cursor-pointer text-xl text-gray-500 mt-1 hover:text-red-600"></i>
                </li>
            </ul>
            <button class="mb-8 mt-2 rounded-md bg-gray-300 text-gray-700 px-2 py-1 hover:bg-gray-400 focus:outline-none" @click="addRow()">Add an item</button>
            <div>
                <Btn @click="createList">Create List</Btn>
            </div>
        </div>
        <div class="text-red-500 py-4" v-if="feedback">{{ feedback }}</div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import Toast from '@/components/common/Toast'
import Btn from '@/components/common/Btn'
import Editable from '@/components/common/Editable'
export default {
    name: "NewNote",
    components: {
        Btn,
        Editable
    },
    data() {
        return {
            newTitle: null,
            newContent: null,
            newColor: null,
            feedback: null,
            displayNote: true,
            list: [ {text: '', completed: false }]
        }
    },
    methods: {
        createNote() {
            let user = firebase.auth().currentUser.email

            if(!this.newTitle){
                this.feedback = "title is required"
                return
            }
            if(!this.newContent){
                this.feedback = "content is required"
                return
            }

            if(this.newTitle && this.newContent){
                db.collection('users').doc(user).collection('notes').add({
                    title: this.newTitle,
                    content: this.newContent,
                    color: this.newColor,
                    type: 1,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                })
                this.newTitle = null
                this.newContent = null
                this.feedback = null
                this.toastMessage = null
                this.$router.push({ name: "Home" })
            }else{
                this.feedback = "there was an error creating the note"
            }
        },
        createList() {
            console.log(this.list)
            let user = firebase.auth().currentUser.email

            if(!this.newTitle){
                this.feedback = "title is required"
                return
            }

            if(this.list){
                db.collection('users').doc(user).collection('notes').add({
                    title: this.newTitle,
                    list: this.list,
                    color: this.newColor,
                    type: 2,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                })
                this.newTitle = null
                this.feedback = null
                this.toastMessage = null
                this.$router.push({ name: "Home" })
            }else{
                this.feedback = "there was an error creating the list"
            }
        },
        selectColor(color) {
            let colors = document.querySelectorAll('.color')
            for (let i = 0; i < colors.length; i++) {
                colors[i].classList.remove('border-gray-800')
            }
            let selectedColor = document.querySelector(`.bg-${color}-500`)
            selectedColor.classList.toggle('border-gray-800')
            this.newColor = color
        },
        addRow() {
            this.list.push({ text: '', completed: false })
        },
        addRowFromEnter(index) {
            let lastIndex = (this.list.length - 1)
            if(lastIndex == index){
                this.list.push({ text: '', completed: false })
                setTimeout(function(){ 
                    let el = document.getElementById(index + 1)
                    el.focus()
                }, 100);
            }
        },
        deleteRow(index) {
            if(this.list.length > 1){
                this.list.splice(index, 1)
            }else{
                this.feedback = "The list must contain at least one item"
            }
        },
        updateListItem(item, index) {
            this.list[index] = { text: item.text, completed: false }
        },
        toggleDisplay() {
            this.displayNote = !this.displayNote
            if(this.displayNote){
                var noteTab = document.getElementById('note-tab')
                noteTab.classList.remove('in-active')
                noteTab.classList.add('active')
                var listTab = document.getElementById('list-tab')
                listTab.classList.remove('active')
                listTab.classList.add('in-active')
            }else{
                var listTab = document.getElementById('list-tab')
                listTab.classList.remove('in-active')
                listTab.classList.add('active')
                var noteTab = document.getElementById('note-tab')
                noteTab.classList.remove('active')
                noteTab.classList.add('in-active')
            }
        }
    }
}
</script>

<style>
.active {
    color: #fff;
    background-color: #38b2ac;
}
.active:hover {
    background-color: #319795;
}
.in-active {
    color: #38b2ac;
}
.in-active:hover {
    background-color: #edf2f7;
}
</style>