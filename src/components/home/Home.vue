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
        <div class="bg-white rounded-lg shadow-lg inline-block relative" v-for="note in notes" :key="note.id">
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
                        <span class="block bg-orange-500 rounded-full h-4 w-4"></span>
                    </div>
                </div>
            </div>
        </div>
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
</style>