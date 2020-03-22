<template>
    <div class="absolute inset-x-0 mx-auto flex p-5">
        <div class="flex-1">
            Logo
        </div>
        <div class="flex-wrap">
            <div @click="clickProfile">
                <avatar class="block cursor-pointer float-right bg-teal-600 rounded-full shadow-lg h-12 w-12" backgroundColor="#38a89d" v-bind:username="username()"></avatar>
            </div>
            <div v-if="isMenuVisible" class="absolute right-0 mr-4 flex-1 mt-16 bg-white rounded-lg py-2 w-32 shadow-xl text-center select-none z-10">
                <div v-if="this.isSignedIn">
                    <router-link class="white-text block px-6 py-2 hover:bg-teal-600 text-gray-800" v-on:click.native="closeNav()" :to="{ name: 'Home' }">Home</router-link>
                    <router-link class="white-text block px-6 py-2 hover:bg-teal-600 text-gray-800" v-on:click.native="closeNav()" :to="{ name: 'Settings' }">Settings</router-link>
                    <a class="white-text block px-6 py-2 hover:bg-teal-600 text-gray-800 cursor-pointer" @click="logout">Logout</a>
                </div>
                <div v-else>
                    <router-link class="white-text block px-6 py-2 hover:bg-teal-600 text-gray-800" v-on:click.native="closeNav()" :to="{ name: 'Login' }">Login</router-link>
                    <router-link class="white-text block px-6 py-2 hover:bg-teal-600 text-gray-800" v-on:click.native="closeNav()" :to="{ name: 'Signup' }">Signup</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import Avatar from 'vue-avatar'
export default {
    name: 'Navbar',
    props: ['isSignedIn', 'userSettings'],
    components: {
        Avatar
    },
    data() {
        return {
            isMenuVisible: false,
            isUserSignedIn: false
        }
    },
    methods: {
        logout(){
            firebase.auth().signOut().then(() => {
                this.$emit('input', false)
                this.isMenuVisible = false
                this.$router.push({ name: 'Login' })
            })
        },
        closeNav(){
            this.isMenuVisible = false
        },
        clickProfile(){
            this.isMenuVisible = !this.isMenuVisible
        },
        username(){
            return this.userSettings.firstName + ' ' + this.userSettings.lastName
        }
    }
}
</script>

<style>
.white-text:hover {
    color: #FFFFFF;
}
.router-link-active {
    color: #FFFFFF!important;
}
</style>