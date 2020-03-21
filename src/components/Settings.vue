<template>
    <div class="p-4">
        <div class="text-2xl mb-4">
            Settings
        </div>
        <div>
            <form @submit.prevent="updateUserSettings">
                <div>
                    <label class="block py-3 lato-bold">First Name</label>
                    <input class="w-full outline-none shadow rounded-lg p-2 mb-2" type="text" name="firstName" v-model="userSettings.firstName" />
                </div>

                <div>
                    <label class="block py-3 lato-bold">Last Name</label>
                    <input class="w-full outline-none shadow rounded-lg p-2 mb-2" type="text" name="lastName" v-model="userSettings.lastName" />
                </div>
                
                <div>
                    <Btn class="mt-4">Save</Btn>
                </div>
                <div class="text-red-500 py-4" v-if="feedback">{{ feedback }}</div>
            </form>
        </div>
        <!--Toast-->
        <Toast v-bind:color="toastColor" v-bind:message="toastMessage" />
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import Toast from '@/components/common/Toast'
import Btn from '@/components/common/Btn'
export default {
    name: 'settings',
    components: {
        Toast,
        Btn
    },
    data() {
        return {
            userSettings: {
                firstName: '',
                lastName: ''
            },
            toastMessage: '',
            toastColor: null,
            feedback: null
        }
    },
    created() {
        let ref = db.collection('users').doc(firebase.auth().currentUser.email).collection('settings').doc('userSettings')

        ref.onSnapshot(doc => {
            if(doc.data()){
                this.userSettings = doc.data()
            }
        })
    },
    methods: {
        updateUserSettings(){
            db.collection('users').doc(firebase.auth().currentUser.email).collection('settings').doc('userSettings').set({
                    firstName: this.userSettings.firstName,
                    lastName: this.userSettings.lastName,
                    dateModified: Date.now()
                })
            this.toastColor = 'teal'
            this.toastMessage = 'User Settings Updated Successfully!'
            this.$children[1].toast()
        }
    }
}
</script>

<style>
</style>