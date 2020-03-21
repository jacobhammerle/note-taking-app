<template>
    <div class="p-4">
        <div class="text-2xl mb-4">
            Settings
        </div>
        <div>
            <form @submit.prevent="userSettings">
                <div>
                    <label class="block py-3 lato-bold">First Name</label>
                    <input class="w-full outline-none shadow rounded-lg p-2 mb-2" type="text" name="firstName" v-model="firstName" />
                </div>

                <div>
                    <label class="block py-3 lato-bold">Last Name</label>
                    <input class="w-full outline-none shadow rounded-lg p-2 mb-2" type="text" name="lastName" v-model="lastName" />
                </div>
                
                <div>
                    <Btn class="mt-4">Save</Btn>
                </div>
                <div class="text-red-500 py-4" v-if="feedback">{{ feedback }}</div>
            </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import Btn from '@/components/common/Btn'
export default {
    name: 'settings',
    components: {
        Btn
    },
    data() {
        return {
            firstName: null,
            lastName: null,
            feedback: null
        }
    },
    methods: {
        userSettings(){
            db.collection('users').doc(firebase.auth().currentUser.email).set({
                    firstName: this.firstName,
                    lastName: this.lastName
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style>
</style>