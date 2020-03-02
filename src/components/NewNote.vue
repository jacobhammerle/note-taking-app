<template>
    <div class="w-full p-4">
        <div>
            <a href="/home" class="cursor-pointer">Back</a>
        </div>
        <form autocomplete="off" @submit.prevent="createNote">
            <div>
                <label class="block py-3 lato-bold" for="new-message">Title</label>
                <div class="flex justify-between">
                    <div class="flex-1 pr-2">
                        <input class="w-full outline-none shadow rounded-lg p-2 mb-2" type="text" name="title" v-model="newTitle" />
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
                <label class="block py-3 lato-bold" for="new-message">Content</label>
                <textarea class="w-full outline-none shadow rounded-lg p-4 h-64 mb-8" type="text" name="content" v-model="newContent" />
            </div>
            <div>
                <button class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg" @click="createNote">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: "NewNote",
    data() {
        return {
            newTitle: null,
            newContent: null,
            newColor: null,
            feedback: null
        }
    },
    methods: {
        createNote() {
            if(this.newTitle && this.newContent && this.newColor){
                db.collection('notes').add({
                    title: this.newTitle,
                    content: this.newContent,
                    color: this.newColor,
                    uid: firebase.auth().currentUser.uid,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                })
                this.newTitle = null
                this.newContent = null
                this.feedback = null
                this.$router.push({ name: "Home" })
            }else{
                this.feedback = 'You must enter a title and content in order to create a new note'
            }
        },
        selectColor(color) {
            const colors = document.querySelectorAll('.color')
            for (var i = 0; i < colors.length; i++) {
                colors[i].classList.remove('border-gray-800')
            }
            const selectedColor = document.querySelector(`.bg-${color}-500`)
            selectedColor.classList.toggle('border-gray-800')
            this.newColor = color
        }
    }
}
</script>

<style>

</style>