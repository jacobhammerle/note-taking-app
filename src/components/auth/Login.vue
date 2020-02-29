<template>
    <div class="max-w-sm mx-auto p-4">
        <form @submit.prevent="login">
            <h2 class="text-center text-2xl">Login</h2>
            <div>
                <label class="block py-3 lato-bold" for="email">Email:</label>
                <input class="w-full outline-none shadow rounded-lg p-2 mb-2" type="email" name="email" v-model="email" />
            </div>
            <div>
                <label class="block py-3 lato-bold" for="password">Password:</label>
                <input class="w-full outline-none shadow rounded-lg p-2 mb-2" type="password" name="password" v-model="password" />
            </div>
            <div class="text-center">
               <button class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg mt-4">Login</button>
            </div>
        </form>
        <div class="text-center text-sm lato-light mt-4">
            Don't have an account yet? <a class="cursor-pointer lato-regular underline" href="/signup">Signup!</a>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Login',
    data(){
        return {
            email: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        login(){
            if(this.email && this.password){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    this.$router.push({ name: "Home", params: { name: cred.user.email }})
                }).catch(err => {
                    this.feedback = err.message
                })
                this.feedback = null
            }else{
                this.feedback = 'please fill in both fields'
            }
        }
    }
}
</script>

<style>
</style>