<template>
    <div class="chat">
        <div class="note-container flex">
            <div class="flex-1 bg-gray-200 rounded-lg overflow-hidden shadow shadow-inner mr-3">
                <div class="px-6 pt-4 pb-1">
                    <div class="font-bold text-xl mb-2">Create a new note!</div>
                    <p class="text-gray-700 text-base">
                        Start new note by clicking <a @click="createNewNote" class="lato-bold underline">HERE</a>.
                    </p>
                </div>
            </div>

            <div class="flex-1 bg-white rounded-lg overflow-hidden shadow-lg mr-3">
                <div class="px-6 pt-4 pb-1">
                    <div class="font-bold text-xl mb-2">Title of Note</div>
                    <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
                <div class="flex px-6 pb-4 pt-3">
                    <div class="flex-1 lato-light text-xs">
                        February 29th, 2020
                    </div>
                    <div class="flex-end">
                        <span class="block bg-orange-500 rounded-full h-4 w-4"></span>
                    </div>
                </div>
            </div>

            <div class="flex-1 bg-white rounded-lg overflow-hidden shadow-lg mr-3">
                <div class="px-6 pt-4 pb-1">
                    <div class="font-bold text-xl mb-2">Title of Note</div>
                    <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                </div>
                <div class="flex px-6 pb-4 pt-3">
                    <div class="flex-1 lato-light text-xs">
                        February 29th, 2020
                    </div>
                    <div class="flex-end">
                        <span class="block bg-orange-500 rounded-full h-4 w-4"></span>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <span>{{note.title}}</span> |
                    <span>{{note.content}}</span> |
                    <span>{{note.timestamp}}</span>
                </li>
            </ul>
        </div>

        <!--
        <div class="card">
            <div class="card-content">
                <ul class="messages" v-chat-scroll>
                    <li v-for="message in messages" :key="message.id">
                        <span class="teal-text">{{message.name}}</span>
                        <span class="grey-text text-darken-3">{{message.content}}</span>
                        <span class="grey-text time">{{message.timestamp}}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage :name="name" />
            </div>
        </div>
        -->
    </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import moment from 'moment'
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'Home',
    props: ['name'],
    components: {
        NewMessage
    },
    data() {
        return {
            notes: []
        }
    },
    created() {
        let ref = db.collection('notes').orderBy('timestamp')

        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    let doc = change.doc
                    this.notes.push({
                        id: doc.id,
                        title: doc.data().title,
                        content: doc.data().content,
                        timestamp: moment(doc.data().timestamp).format('lll')
                    })
                }
            })
        })
    },
    methods: {
        createNewNote() {
            this.$router.push({ name: "NewNote" })
        }
    },
    mounted() {
        console.log(firebase.auth().currentUser)
    }
}
</script>

<style>
.chat h2{
    font-size: 2.6em;
    margin-bottom: 40px;
}
.chat span{
    font-size: 1.4em;
}
.chat .time{
    display: block;
    font-size: 1em;
}
.messages{
    max-height: 350px;
    overflow: auto;
}
.messages::-webkit-scrollbar{
    width: 3px;
}
.messages::-webkit-scrollbar-track{
    background: #ddd;
}
.messages::-webkit-scrollbar-thumb{
    background: #aaa;
}
</style>