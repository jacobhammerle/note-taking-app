<template>
    <div>
        <form @submit.prevent="createNote">
            <label for="new-message">Title</label>
            <input type="text" name="title" v-model="newTitle" />
            <label for="new-message">Content</label>
            <input type="text" name="content" v-model="newContent" />
            <p v-if="feedback">{{feedback}}</p>
            <button @click="createNote">Create</button>
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
            feedback: null
        }
    },
    methods: {
        createNote(){
            if(this.newTitle && this.newContent){
                db.collection('notes').add({
                    title: this.newTitle,
                    content: this.newContent,
                    uid: firebase.auth().currentUser.uid,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                })
                this.newTitle = null
                this.newContent = null
                this.feedback = null
            }else{
                this.feedback = 'You must enter a title and content in order to create a new note'
            }
        }
    }
}
</script>

<style>

</style>