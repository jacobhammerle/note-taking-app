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
               <Btn class="mt-4">Login</Btn>
            </div>
        </form>
        <div class="text-center text-sm lato-light mt-4">
            Don't have an account yet? <a class="cursor-pointer lato-regular underline" href="/signup">Signup!</a>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import Btn from '@/components/common/Btn'
export default {
    name: 'Login',
    components: {
        Btn
    },
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
                    this.$emit('input', true)
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