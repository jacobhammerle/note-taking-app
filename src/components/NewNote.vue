<template>
    <div class="w-full p-4">
        <div class="pb-8">
            <a href="/home" class="cursor-pointer text-gray-500 hover:underline">return back home</a>
        </div>
        <form autocomplete="off" @submit.prevent="createNote">
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
            <div>
                <label class="block py-3 lato-bold" for="new-note">Content</label>
                <textarea class="w-full outline-none shadow rounded-lg p-4 h-64 mb-8 leading-relaxed" type="text" name="content" v-model="newContent" />
            </div>
            <div>
                <Btn @click="createNote">Create</Btn>
            </div>
            <div>
                <label class="block py-3 lato-bold" for="new-list">List</label>
                <ul id="list" v-for="(item, index) in list" :key="item.id"> 
                    <li class="flex justify-between shadow rounded-lg bg-white p-4 mb-2">
                        <Editable v-bind:value="item.text" v-bind:index="index" @change="updateListItem" />
                        <span contenteditable="false" class="float-right cursor-pointer text-gray-500 hover:text-red-600" @click="deleteRow(index)">Delete</span>
                    </li>
                </ul>
                <button class="mb-8 mt-2 rounded-md bg-gray-300 text-gray-700 px-2 py-1 hover:bg-gray-400 focus:outline-none" @click="addRow()">Add an item</button>
                <div>
                    <Btn @click="createList">Create List</Btn>
                </div>
            </div>
            <div class="text-red-500 py-4" v-if="feedback">{{ feedback }}</div>
        </form>
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
            count: 2,
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
        },
        selectColor(color) {
            const colors = document.querySelectorAll('.color')
            for (var i = 0; i < colors.length; i++) {
                colors[i].classList.remove('border-gray-800')
            }
            const selectedColor = document.querySelector(`.bg-${color}-500`)
            selectedColor.classList.toggle('border-gray-800')
            this.newColor = color
        },
        addRow() {
            this.list.push({ text: '', completed: false })
        },
        deleteRow(index) {
            if(this.list.length > 1){
                this.list.splice(index, 1)
            }else{
                this.feedback = "The list must contain at least one item"
            }
        },
        updateListItem(data) {
            this.list[data.index] = { text: data.text, completed: false }
        }
    }
}
</script>

<style>
</style>