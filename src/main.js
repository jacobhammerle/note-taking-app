import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import './assets/styles/tailwind.css'

Vue.config.productionTip = false

let app = null

// wait for firebase auth to emit before creating the app
firebase.auth().onAuthStateChanged(() => {

  // init app if not already created
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})