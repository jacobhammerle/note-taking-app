<template>
    <div class="absolute inset-x-0 mx-auto flex p-5">
        <div class="flex-1">
            Notes
            <!--<router-link :to="{ name: 'Home' }">Your Notes</router-link>
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
            <router-link :to="{ name: 'Login' }">Login</router-link>
            <a @click="logout">Logout</a>-->
        </div>
        <div class="flex-wrap">
            <div @click="clickProfile" class="block cursor-pointer float-right bg-teal-600 rounded-full shadow-lg h-12 w-12">
            </div>
            <div v-if="isMenuVisible" class="flex-1 mt-16 bg-white rounded-lg py-2 w-32 shadow-xl text-center">
                <router-link class="block px-6 py-2 text-gray-800 hover:bg-teal-600 hover:text-white" :to="{ name: 'Home' }">Home</router-link>
                <router-link class="block px-6 py-2 text-gray-800 hover:bg-teal-600 hover:text-white" :to="{ name: 'Signup' }">Signup</router-link>
                <router-link class="block px-6 py-2 text-gray-800 hover:bg-teal-600 hover:text-white" :to="{ name: 'Login' }">Login</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Navbar',
    data() {
        return {
            isMenuVisible: false
        }
    },
    methods: {
        logout(){
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: 'Login' })
            })
        },
        clickProfile(){
            this.isMenuVisible = !this.isMenuVisible
        }
    }
}
</script>

<style>

</style>