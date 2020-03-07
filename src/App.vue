<template>
  <div id="app" class="bg-gray-100 h-screen">
    <Navbar @input="updateSignIn" v-bind:is-signed-in="isSignedIn" />
    <div class="max-w-4xl mx-auto pt-32">
      <router-view @input="updateSignIn" />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'App',
  data() {
    return {
      isSignedIn: false
    }
  },
  components: {
    Navbar
  },
  methods: {
    updateSignIn(newVal) {
      this.isSignedIn = newVal
    }
  },
  mounted(){
    if(firebase.auth().currentUser){
      this.isSignedIn = true
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