<template>
    <div class="max-w-sm mx-auto p-4">
        <form @submit.prevent="signup">
            <h2 class="text-center text-2xl">Signup</h2>
            <div>
                <label class="block py-3 lato-bold" for="email">Email:</label>
                <input class="w-full outline-none shadow rounded-lg p-2 mb-2" type="email" name="email" v-model="email" />
            </div>
            <div>
                <label class="block py-3 lato-bold" for="password">Password:</label>
                <input class="w-full outline-none shadow rounded-lg p-2 mb-2" type="password" name="password" v-model="password" />
            </div>
            <div>
                <label class="block py-3 lato-bold" for="username">Username:</label>
                <input class="w-full outline-none shadow rounded-lg p-2 mb-2" type="text" name="username" v-model="username" />
            </div>
            <div class="text-red-500 py-4" v-if="feedback">{{ feedback }}</div>
            <div class="text-center">
               <Btn class="mt-4">Signup</Btn>
            </div>
        </form>
        <div class="text-center text-sm lato-light mt-4">
            Already have an account? <a class="cursor-pointer lato-regular underline" href="/login">Login!</a>
        </div>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'
import Btn from '@/components/common/Btn'
export default {
    name: 'Signup',
    components: {
        Btn
    },
    data() {
        return {
            email: null,
            password: null,
            username: null,
            feedback: null,
            slug: null
        }
    },
    methods: {
        signup(){
            if(this.username && this.email && this.password){
                this.slug = slugify(this.username, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                let ref = db.collection('users').doc(this.email)
                ref.get().then(doc => {
                    if(doc.exists){
                        this.feedback = 'This username already exists'
                    }else{
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(cred => {
                            ref.set({
                                username: this.slug,
                                user_id: cred.user.uid
                            })
                        }).then(() => {
                            this.$emit('input', true)
                            this.feedback = null
                            this.$router.push({ name: 'Home', params: { name: this.slug }})
                        }).catch(err => {
                            this.feedback = err.message
                        })
                    }
                })
            }else{
                this.feedback = "Please fill in all fields"
            }
        }
    }
}
</script>

<style>
.signup{
    max-width: 400px;
    margin-top: 60px;
}
.signup h2{
    font-size: 2.4em;
}
.signup .field{
    margin-bottom: 16px;
}
</style>