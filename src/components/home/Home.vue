<template>
    <div>
        <div class="xl:hidden lg:hidden md:hidden sm:block md:invisible sm:visible mx-4 mb-4">
            <Btn class="w-full" @click="createNewNote">Create</Btn>
        </div>
        <div class="xl:hidden lg:hidden md:hidden sm:block md:invisible sm:visible mx-4 mb-4">
            <input v-on:keyup="searchTimeOut()" class="w-full bg-white outline-none shadow-md focus:shadow-lg transition duration-200 rounded-lg py-2 px-8 mb-2 h-12" placeholder="Search by note title..." type="text" name="search" v-model="search" />
        </div>
        <div class="hidden xl:flex lg:flex md:flex sm:hidden justify-between">
            <div class="w-4/6 ml-4 mb-4">
                <input v-on:keyup="searchTimeOut()" class="w-full bg-white outline-none shadow-md focus:shadow-lg transition duration-200 rounded-lg py-2 px-8 mb-2 h-12" placeholder="Search by note title..." type="text" name="search" v-model="search" />
            </div>
            <div class="mr-4 mb-4">
                <Btn @click="createNewNote">Create</Btn>
            </div>
        </div>
        <!-- Folders -->
        <div class="w-full">
            <div class="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-4 mx-4">
                <div @click="addFolder" class="bg-gray-200 hover:bg-gray-300 hover:text-gray-700 cursor-pointer rounded-md text-gray-700">
                    <div v-if="!isAddingFolder" class="px-6 py-4">
                        <i class="fas fa-plus"></i><span class="ml-2">Add Folder</span>
                    </div>
                    <div v-else>
                        <input id="add-folder" @keyup.enter="addFolderFromEnter" v-model="folderTitle" class="w-full outline-none bg-gray-200 px-6 py-4 rounded-md" type="text" />
                    </div>
                </div>
                <div v-for="folder in folders" :key="folder.id" @click="navigateInsideFolder(folder.id)" @mouseover="showDelete(folder.id, true)" @mouseleave="showDelete(folder.id, false)" class="flex justify-between relative bg-gray-200 hover:bg-gray-300 hover:text-gray-700 px-6 py-4 cursor-pointer rounded-md text-gray-700">
                    <div class="flex justify-between">
                        <div>
                            <i class="fas fa-folder"></i>
                        </div>
                        <div class="ml-2">
                            {{folder.title}}
                        </div>
                    </div>
                    <div @click="deleteFolder(folder.id)" v-bind:id="'folder-' + folder.id" class="hidden absolute right-0 bg-red-500 px-4 rounded-r-md text-white h-full hover:bg-red-700 top-0">
                        <div class="flex h-full">
                            <i class="self-center far fa-trash-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!emptySearch" class="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 mb-8">
            <!-- Card Section -->
            <div  @click="selectNote(note)" v-for="note in notes" :key="note.id" class="modal-open bg-white rounded-lg cursor-pointer shadow-lg inline-block relative hover:shadow-2xl transition duration-200">
                <div class="px-6 pt-4 pb-16">
                    <div class="flex justify-between">
                        <div class="font-bold text-xl mb-2">{{note.title}}</div>
                        <div @click.prevent="selectNote" @click="noteOptions(note)" class="text-gray-800 hover:text-gray-600 pl-2 pr-1 py-1"><i class="fas fa-ellipsis-v text-sm"></i></div>
                        <div v-bind:id="note.id" class="hidden absolute right-0 mr-2 mt-8 bg-gray-200 rounded-md py-1 w-20 shadow-xl text-right">
                            <div @click.prevent="selectNote" @click="moveNote(note)" class="white-text text-gray-700 block px-4 py-1 hover:bg-gray-500">Move</div>
                            <div @click.prevent="selectNote" @click="deleteNote(note)" class="white-text text-gray-700 block px-4 py-1 hover:bg-gray-500">Delete</div>
                        </div>
                    </div>
                    <div v-if="note.type == 1 || !note.type">
                        <div class="text-gray-700 text-base leading-relaxed whitespace-pre-line">{{displayContent(note.content)}}</div>
                    </div>
                    <div v-else>
                        <div v-for="(item, index) in note.list.slice(0, 6)" class="text-gray-700 flex text-base leading-relaxed">
                            <div>
                                <input class="flex-start flex-shrink-0 mr-2 leading-tight mt-1 cursor-pointer" type="checkbox" @change="checkItem(index, item, note)" @change.prevent="selectNote" v-model="item.completed">
                            </div>
                            <div class="flex-auto ml-1">
                                {{displayItem(item.text)}}
                            </div>
                        </div>
                        <div v-if="note.list.length > 6" class="text-gray-700 flex text-base leading-relaxed tracking-wider">
                            ...
                        </div>
                    </div>
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
            <Toast ref="toast" />
            <!--Modal-->
            <NoteModal ref="modal" v-bind:note="editNote" @reload-data="reloadData" @update="updateNote" @delete="deleteNote" />
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
            folders: [],
            editNote: null,
            search: null,
            emptySearch: false,
            folderTitle: '',
            isAddingFolder: false,
            isOptionsVisible: false
        }
    },
    created() {
        // get folders
        let folderRef = db.collection('users').doc(firebase.auth().currentUser.email).collection('folders').orderBy("dateCreated", "desc")
        folderRef.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    let doc = change.doc
                    this.folders.push({
                        id: doc.id,
                        title: doc.data().title
                    })
                }else if(change.type == 'removed'){
                    let doc = change.doc
                    let index = this.folders.findIndex(folder => folder.id === doc.id)
                    this.folders.splice(index, 1)
                }
            })
        })

        // get notes
        let noteRef = db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').orderBy("timestamp", "desc")
        noteRef.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    let doc = change.doc
                    this.notes.push({
                        id: doc.id,
                        type: doc.data().type,
                        title: doc.data().title,
                        content: doc.data().content,
                        list: doc.data().list,
                        color: doc.data().color,
                        timestamp: moment(doc.data().timestamp).format('lll')
                    })
                }else if(change.type == 'modified'){
                    let doc = change.doc
                    let index = this.notes.findIndex(note => note.id === doc.id)
                    this.notes[index].title = doc.data().title
                    this.notes[index].list = doc.data().list
                    this.notes[index].color = doc.data().color
                    this.notes[index].timestamp = moment(doc.data().timestamp).format('lll')
                }else if(change.type == 'removed'){
                    let doc = change.doc
                    let index = this.notes.findIndex(note => note.id === doc.id)
                    this.notes.splice(index, 1)
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
            this.$refs.modal.toggleModal()
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
                    if(!this.search){
                        this.emptySearch = false
                        this.reloadData()
                    }else if(snapshot.empty){
                         this.emptySearch = true
                    }else{
                        this.emptySearch = false
                        snapshot.docChanges().forEach(change => {
                            if(change.type == 'added'){
                                let doc = change.doc
                                this.notes.push({
                                    id: doc.id,
                                    type: doc.data().type,
                                    title: doc.data().title,
                                    content: doc.data().content,
                                    list: doc.data().list,
                                    color: doc.data().color,
                                    timestamp: moment(doc.data().timestamp).format('lll')
                                })
                            }
                        })
                    }
                })
            }, 400)
        },
        displayContent(content) {
            return content.trunc(200)
        },
        displayItem(item) {
            return item.trunc(55)
        },
        reloadData() {
            this.notes = []
            let ref = db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').orderBy("timestamp", "desc")
            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type == 'added'){
                        let doc = change.doc
                        this.notes.push({
                            id: doc.id,
                            type: doc.data().type,
                            title: doc.data().title,
                            content: doc.data().content,
                            list: doc.data().list,
                            color: doc.data().color,
                            timestamp: moment(doc.data().timestamp).format('lll')
                        })
                    }
                })
            })
        },
        deleteNote(note) {
            db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').doc(note.id).delete().then(doc => {
                this.$refs.toast.toast('Note Successfully Deleted!', 'teal')
                this.reloadData()
            }).catch(function(error) {
                this.$refs.toast.toast(error, 'red')
            })
        },
        checkItem(index, item, note) {
            note.list[index] = { completed: item.completed, text: item.text }
            this.updateNote(note)
        },
        updateNote(note) {
            if(note.type == 1 || !note.type){
                db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').doc(note.id).update({
                    title: note.title,
                    content: note.content,
                    dateModified: Date.now()
                })
            }else{
                db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').doc(note.id).update({
                    title: note.title,
                    list: note.list,
                    dateModified: Date.now()
                })
            }
        },
        addFolder() {
            this.isAddingFolder = true
            setTimeout(function(){ 
                let el = document.getElementById('add-folder')
                el.focus()
            }, 100)
        },
        addFolderFromEnter() {
            db.collection('users').doc(firebase.auth().currentUser.email).collection('folders').add({
                title: this.folderTitle,
                notes: [],
                dateCreated: Date.now()
            }).catch(err => {
                console.log(err)
            })

            this.folderTitle = ''
            this.isAddingFolder = false
        },
        showDelete(id, show) {
            if(show){
                let el = document.getElementById('folder-' + id)
                el.classList.remove("hidden")
            }else{
                let el = document.getElementById('folder-' + id)
                el.classList.add("hidden")
            }
        },
        deleteFolder(id) {
            db.collection('users').doc(firebase.auth().currentUser.email).collection('folders').doc(id).delete().then(doc => {
                this.$refs.toast.toast('Folder Successfully Deleted!', 'teal')
                this.reloadData()
            }).catch(function(error) {
                this.$refs.toast.toast(error, 'read')
            })
        },
        navigateInsideFolder(id) {
            console.log(id)
        },
        noteOptions(note) {
            let el = document.getElementById(note.id)
            el.classList.toggle("hidden")
            console.log('note options for note id: ' + note.id)
        },
        closeNoteOptions(id) {
            let el = document.getElementById(id);
            el.classList.toggle("hidden");
        },
        moveNote(note) {
            /*
            db.collection('users').doc(firebase.auth().currentUser.email).collection('notes').doc(note.id).delete().then(doc => {

            }).catch(function(error) {

            })
            */

            db.collection('users').doc(firebase.auth().currentUser.email).collection('folders').doc('jBRBpI0hl2cCAU7Zx1N1').update({
                notes: note
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        String.prototype.trunc = String.prototype.trunc ||
        function(n){
            return (this.length > n) ? this.substr(0, n-1) + '...' : this
        }
    }
}
</script>

<style>
</style>