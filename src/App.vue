<template>
  <div id="app" class="bg-gray-100 h-screen">
    <Navbar @input="updateSignIn" v-bind:is-signed-in="isSignedIn" v-bind:user-settings="userSettings" />
    <div class="max-w-4xl mx-auto pt-32">
      <router-view @input="updateSignIn" />
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'App',
  data() {
    return {
      isSignedIn: false,
      userSettings: {
          firstName: '',
          lastName: ''
      }
    }
  },
  components: {
    Navbar
  },
  methods: {
    updateSignIn(newVal) {
      this.isSignedIn = newVal
      if(!this.isSignedIn){
        this.userSettings.firstName = ''
        this.userSettings.lastName = ''
      }else{
        this.getUsername()
      }
    },
    getUsername() {
      let ref = db.collection('users').doc(firebase.auth().currentUser.email).collection('settings').doc('userSettings')
      ref.onSnapshot(doc => {
          if(doc.data()){
              this.userSettings = doc.data()
          }
      })
    }
  },
  mounted(){
    if(firebase.auth().currentUser){
      this.isSignedIn = true
      this.getUsername()
    }
  }
}
</script>

<style>
#app{
  font-family: 'lato-regular', sans-serif;
}
.router-link-exact-active{
  background-color: #38B2AC;
  color: #ffffff;
}
.lato-bold{
  font-family: 'lato-bold', sans-serif;
}
.lato-regular{
  font-family: 'lato-regular', sans-serif;
}
.lato-light{
  font-family: 'lato-light', sans-serif;
}
</style>