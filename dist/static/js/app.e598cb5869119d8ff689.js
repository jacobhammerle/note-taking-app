webpackJsonp([1],{"2Gzn":function(t,e){},"7Cjr":function(t,e){},EQXc:function(t,e){},"I+bF":function(t,e){},IwDu:function(t,e){},IzYS:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),a=s("kxiW"),o=s.n(a),i={name:"Navbar",props:["isSignedIn"],data:()=>({isMenuVisible:!1,isUserSignedIn:!1}),methods:{logout(){o.a.auth().signOut().then(()=>{this.$emit("input",!1),this.isMenuVisible=!1,this.$router.push({name:"Login"})})},closeNav(){this.isMenuVisible=!1},clickProfile(){this.isMenuVisible=!this.isMenuVisible}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"absolute inset-x-0 mx-auto flex p-5"},[s("div",{staticClass:"flex-1"},[t._v("\n        Logo\n    ")]),t._v(" "),s("div",{staticClass:"flex-wrap"},[s("div",{staticClass:"block cursor-pointer float-right bg-teal-600 rounded-full shadow-lg h-12 w-12",on:{click:t.clickProfile}}),t._v(" "),t.isMenuVisible?s("div",{staticClass:"absolute right-0 mr-4 flex-1 mt-16 bg-white rounded-lg py-2 w-32 shadow-xl text-center select-none z-50"},[this.isSignedIn?s("div",[s("router-link",{staticClass:"block px-6 py-2 hover:bg-teal-600 hover:text-white text-gray-800",attrs:{to:{name:"Home"}},nativeOn:{click:function(e){return t.closeNav()}}},[t._v("Home")]),t._v(" "),s("router-link",{staticClass:"block px-6 py-2 hover:bg-teal-600 hover:text-white text-gray-800",attrs:{to:{name:"Settings"}},nativeOn:{click:function(e){return t.closeNav()}}},[t._v("Settings")]),t._v(" "),s("a",{staticClass:"block px-6 py-2 hover:bg-teal-600 hover:text-white text-gray-800 cursor-pointer",on:{click:t.logout}},[t._v("Logout")])],1):s("div",[s("router-link",{staticClass:"block px-6 py-2 hover:bg-teal-600 hover:text-white text-gray-800",attrs:{to:{name:"Login"}},nativeOn:{click:function(e){return t.closeNav()}}},[t._v("Login")]),t._v(" "),s("router-link",{staticClass:"block px-6 py-2 hover:bg-teal-600 hover:text-white text-gray-800",attrs:{to:{name:"Signup"}},nativeOn:{click:function(e){return t.closeNav()}}},[t._v("Signup")])],1)]):t._e()])])},staticRenderFns:[]};var r={name:"App",data:()=>({isSignedIn:!1}),components:{Navbar:s("VU/8")(i,l,!1,function(t){s("I+bF")},null,null).exports},methods:{updateSignIn(t){this.isSignedIn=t}},mounted(){o.a.auth().currentUser&&(this.isSignedIn=!0)}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bg-gray-100 h-screen",attrs:{id:"app"}},[e("Navbar",{attrs:{"is-signed-in":this.isSignedIn},on:{input:this.updateSignIn}}),this._v(" "),e("div",{staticClass:"max-w-4xl mx-auto pt-32"},[e("router-view",{on:{input:this.updateSignIn}})],1)],1)},staticRenderFns:[]};var d=s("VU/8")(r,c,!1,function(t){s("ccR5")},null,null).exports,u=s("/ocq"),m=s("wffv"),h=s.n(m);s("881v");var p=o.a.initializeApp({apiKey:"AIzaSyCIZjuLPVDKdd1lvePRJbdWVtegdMvwS38",authDomain:"note-taking-app-d4f53.firebaseapp.com",databaseURL:"https://note-taking-app-d4f53.firebaseio.com",projectId:"note-taking-app-d4f53",storageBucket:"note-taking-app-d4f53.appspot.com",messagingSenderId:"890696335023",appId:"1:890696335023:web:c76efbafc302d3ebe9de5a",measurementId:"G-2FC8TRXB77"}).firestore(),v={name:"btn",methods:{onClick(){this.$emit("click")}}},g={render:function(){var t=this.$createElement;return(this._self._c||t)("button",{staticClass:"bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg h-12 focus:outline-none",on:{click:this.onClick}},[this._t("default",[this._v("Button")])],2)},staticRenderFns:[]};var f=s("VU/8")(v,g,!1,function(t){s("UZ1v")},null,null).exports,b={name:"Signup",components:{Btn:f},data:()=>({email:null,password:null,username:null,feedback:null,slug:null}),methods:{signup(){if(this.username&&this.email&&this.password){this.slug=h()(this.username,{replacement:"-",remove:/[$*_+~.()'"!\-:@]/g,lower:!0});let t=p.collection("users").doc(this.email);t.get().then(e=>{e.exists?this.feedback="This username already exists":o.a.auth().createUserWithEmailAndPassword(this.email,this.password).then(e=>{t.set({username:this.slug,user_id:e.user.uid})}).then(()=>{this.$emit("input",!0),this.feedback=null,this.$router.push({name:"Home",params:{name:this.slug}})}).catch(t=>{this.feedback=t.message})})}else this.feedback="Please fill in all fields"}}},w={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"max-w-sm mx-auto p-4"},[s("form",{on:{submit:function(e){return e.preventDefault(),t.signup(e)}}},[s("h2",{staticClass:"text-center text-2xl"},[t._v("Signup")]),t._v(" "),s("div",[s("label",{staticClass:"block py-3 lato-bold",attrs:{for:"email"}},[t._v("Email:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"w-full outline-none shadow rounded-lg p-2 mb-2",attrs:{type:"email",name:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),t._v(" "),s("div",[s("label",{staticClass:"block py-3 lato-bold",attrs:{for:"password"}},[t._v("Password:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"w-full outline-none shadow rounded-lg p-2 mb-2",attrs:{type:"password",name:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),s("div",[s("label",{staticClass:"block py-3 lato-bold",attrs:{for:"username"}},[t._v("Username:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"w-full outline-none shadow rounded-lg p-2 mb-2",attrs:{type:"text",name:"username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})]),t._v(" "),t.feedback?s("div",{staticClass:"text-red-500 py-4"},[t._v(t._s(t.feedback))]):t._e(),t._v(" "),s("div",{staticClass:"text-center"},[s("Btn",{staticClass:"mt-4"},[t._v("Signup")])],1)]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"text-center text-sm lato-light mt-4"},[this._v("\n        Already have an account? "),e("a",{staticClass:"cursor-pointer lato-regular underline",attrs:{href:"/login"}},[this._v("Login!")])])}]};var j=s("VU/8")(b,w,!1,function(t){s("TxY8")},null,null).exports,x={name:"Login",components:{Btn:f},data:()=>({email:null,password:null,feedback:null}),methods:{login(){this.email&&this.password?o.a.auth().signInWithEmailAndPassword(this.email,this.password).then(t=>{this.$emit("input",!0),this.feedback=null,this.$router.push({name:"Home",params:{name:t.user.email}})}).catch(t=>{this.feedback=t.message}):this.feedback="please fill in both fields"}}},y={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"max-w-sm mx-auto p-4"},[s("form",{on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[s("h2",{staticClass:"text-center text-2xl"},[t._v("Login")]),t._v(" "),s("div",[s("label",{staticClass:"block py-3 lato-bold",attrs:{for:"email"}},[t._v("Email:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"w-full outline-none shadow rounded-lg p-2 mb-2",attrs:{type:"email",name:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),t._v(" "),s("div",[s("label",{staticClass:"block py-3 lato-bold",attrs:{for:"password"}},[t._v("Password:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"w-full outline-none shadow rounded-lg p-2 mb-2",attrs:{type:"password",name:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),t.feedback?s("div",{staticClass:"text-red-500 py-4"},[t._v(t._s(t.feedback))]):t._e(),t._v(" "),s("div",{staticClass:"text-center"},[s("Btn",{staticClass:"mt-4"},[t._v("Login")])],1)]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"text-center text-sm lato-light mt-4"},[this._v("\n        Don't have an account yet? "),e("a",{staticClass:"cursor-pointer lato-regular underline",attrs:{href:"/signup"}},[this._v("Signup!")])])}]};var C=s("VU/8")(x,y,!1,function(t){s("PjEI")},null,null).exports,_=s("PJh5"),k=s.n(_),N={name:"toast",props:["message"],data:()=>({}),methods:{toast(){const t=document.querySelector(".alert-toast");t.classList.toggle("hidden"),setTimeout(function(){t.classList.toggle("hidden")},3e3)}}},S={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm hidden"},[e("input",{staticClass:"hidden",attrs:{type:"checkbox",id:"footertoast"}}),this._v(" "),e("label",{staticClass:"close cursor-pointer flex items-start justify-between w-full p-2 bg-gray-500 h-auto rounded shadow-lg text-white",attrs:{title:"close",for:"footertoast"}},[this._v("\n    "+this._s(this.message)+"\n    \n    "),e("svg",{staticClass:"fill-current text-white",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 18 18"}},[e("path",{attrs:{d:"M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"}})])])])},staticRenderFns:[]};var z=s("VU/8")(N,S,!1,function(t){s("al5r")},null,null).exports,E={props:["value"],methods:{onBlurInput(){this.$emit("input",this.$refs.editable.innerText)}},mounted(){this.$refs.editable.innerText=this.value},watch:{value:{handler(t,e){this.$refs.editable.innerText=t}}}},U={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"editable",staticClass:"w-full resize-none outline-none leading-relaxed",attrs:{contenteditable:"true"},on:{blur:this.onBlurInput}})},staticRenderFns:[]};var L={name:"noteModal",props:["editNote"],components:{Editable:s("VU/8")(E,U,!1,function(t){s("EQXc")},null,null).exports},data:()=>({}),methods:{toggleModal(){const t=document.querySelector("body"),e=document.querySelector(".modal");e.classList.toggle("opacity-0"),e.classList.toggle("pointer-events-none"),t.classList.toggle("modal-active")},deleteNote(t){p.collection("users").doc(o.a.auth().currentUser.email).collection("notes").doc(t.id).delete().then(function(){}).catch(function(t){console.error(t)}),this.toggleModal(),this.$emit("reload-data")},onUpdateNoteContent(t){this.editNote.content=t,p.collection("users").doc(o.a.auth().currentUser.email).collection("notes").doc(this.editNote.id).update({content:this.editNote.content,dateModified:Date.now()})},onUpdateNoteTitle(t){this.editNote.title=t,p.collection("users").doc(o.a.auth().currentUser.email).collection("notes").doc(this.editNote.id).update({title:this.editNote.title,dateModified:Date.now()})}},mounted(){document.querySelectorAll(".modal-open");document.querySelector(".modal-overlay").addEventListener("click",this.toggleModal),document.onkeydown=function(t){let e=!1;(e="key"in(t=t||window.event)?"Escape"===t.key||"Esc"===t.key:27===t.keyCode)&&document.body.classList.contains("modal-active")&&this.toggleModal()}}},I={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center"},[s("div",{staticClass:"modal-overlay absolute w-full h-full bg-gray-800 opacity-50"}),t._v(" "),s("div",{staticClass:"modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"},[t.editNote?s("div",{staticClass:"modal-content py-4 text-left px-6"},[s("div",{staticClass:"flex justify-between items-center pb-3"},[s("Editable",{staticClass:"text-2xl font-bold",attrs:{value:t.editNote.title},on:{input:t.onUpdateNoteTitle}}),t._v(" "),s("div",{staticClass:"modal-close cursor-pointer z-50",on:{click:function(e){return t.toggleModal()}}},[s("svg",{staticClass:"fill-current text-black",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 18 18"}},[s("path",{attrs:{d:"M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"}})])])],1),t._v(" "),s("Editable",{attrs:{value:t.editNote.content},on:{input:t.onUpdateNoteContent}}),t._v(" "),s("div",{staticClass:"flex justify-end pt-2"},[s("button",{staticClass:"mr-2 py-2 px-4 rounded-lg",class:[t.editNote.color?"text-"+t.editNote.color+"-600 hover:text-"+t.editNote.color+"-500 hover:bg-gray-100":"text-teal-600 hover:text-teal-500 hover:bg-gray-100"],on:{click:function(e){return t.deleteNote(t.editNote)}}},[t._v("Delete")]),t._v(" "),s("button",{staticClass:"modal-close text-white font-bold py-2 px-4 rounded-lg",class:[t.editNote.color?"bg-"+t.editNote.color+"-500 hover:bg-"+t.editNote.color+"-600":"bg-teal-500 hover:bg-teal-600"],on:{click:function(e){return t.toggleModal()}}},[t._v("Close")])])],1):t._e()])])},staticRenderFns:[]};var P={name:"Home",props:["name"],components:{Toast:z,NoteModal:s("VU/8")(L,I,!1,function(t){s("agSC")},null,null).exports,Btn:f},data:()=>({notes:[],editNote:null,search:null,emptySearch:!1,toastMessage:"Note Deleted"}),created(){p.collection("users").doc(o.a.auth().currentUser.email).collection("notes").orderBy("timestamp","desc").onSnapshot(t=>{t.docChanges().forEach(t=>{if("added"==t.type){let e=t.doc;this.notes.push({id:e.id,title:e.data().title,content:e.data().content,color:e.data().color,timestamp:k()(e.data().timestamp).format("lll")})}})})},methods:{createNewNote(){this.$router.push({name:"NewNote"})},selectNote(t){this.editNote=t,this.$children[2].toggleModal()},searchTimeOut(){this.timer&&(clearTimeout(this.timer),this.timer=null),this.timer=setTimeout(()=>{this.notes=[],p.collection("users").doc(o.a.auth().currentUser.email).collection("notes").orderBy("title").startAt(this.search).endAt(this.search+"").onSnapshot(t=>{t.empty?this.emptySearch=!0:(this.emptySearch=!1,t.docChanges().forEach(t=>{if("added"==t.type){let e=t.doc;this.notes.push({id:e.id,title:e.data().title,content:e.data().content,color:e.data().color,timestamp:k()(e.data().timestamp).format("lll")})}}))})},400)},displayContent:t=>t.trunc(200),reloadData(){this.$children[1].toast(),this.notes=[],p.collection("users").doc(o.a.auth().currentUser.email).collection("notes").orderBy("timestamp","desc").onSnapshot(t=>{t.docChanges().forEach(t=>{if("added"==t.type){let e=t.doc;this.notes.push({id:e.id,title:e.data().title,content:e.data().content,color:e.data().color,timestamp:k()(e.data().timestamp).format("lll")})}})})}},mounted(){String.prototype.trunc=String.prototype.trunc||function(t){return this.length>t?this.substr(0,t-1)+"...":this}}},T={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"flex justify-between"},[s("div",{staticClass:"ml-4 mb-4 w-4/6 lg:w-4/6 md:w-4/6"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"w-full bg-white outline-none shadow-md focus:shadow-lg transition duration-200 rounded-lg py-2 px-8 mb-2 h-12",attrs:{placeholder:"Search by note title...",type:"text",name:"search"},domProps:{value:t.search},on:{keyup:function(e){return t.searchTimeOut()},input:function(e){e.target.composing||(t.search=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"mr-4 mb-4"},[s("Btn",{on:{click:t.createNewNote}},[t._v("Create Note")])],1)]),t._v(" "),t.emptySearch?s("div",{staticClass:"w-full text-center p-8 md:text-lg sm:text-md"},[t._v("\n        no notes were found\n    ")]):s("div",{staticClass:"w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 mb-8"},[t._l(t.notes,function(e){return s("div",{key:e.id,staticClass:"modal-open bg-white rounded-lg cursor-pointer shadow-lg inline-block relative hover:shadow-2xl transition duration-200",on:{click:function(s){return t.selectNote(e)}}},[s("div",{staticClass:"px-6 pt-4 pb-16"},[s("div",{staticClass:"font-bold text-xl mb-2"},[t._v(t._s(e.title))]),t._v(" "),s("div",{staticClass:"text-gray-700 text-base leading-relaxed whitespace-pre-line"},[t._v(t._s(t.displayContent(e.content)))])]),t._v(" "),s("div",{staticClass:"absolute bottom-0 w-full px-6 pb-4 pt-3"},[s("div",{staticClass:"flex justify-between"},[s("div",{staticClass:"inline-block lato-light text-xs"},[t._v("\n                        "+t._s(e.timestamp)+"\n                    ")]),t._v(" "),s("div",{staticClass:"inline-block"},[s("span",{staticClass:"block rounded-full h-4 w-4",class:[e.color?"bg-"+e.color+"-500":"bg-gray-200"]})])])])])}),t._v(" "),s("Toast",{attrs:{message:t.toastMessage}}),t._v(" "),s("NoteModal",{attrs:{"edit-note":t.editNote},on:{"reload-data":t.reloadData}})],2)])},staticRenderFns:[]};var q=s("VU/8")(P,T,!1,function(t){s("IwDu")},null,null).exports,M={name:"settings",data:()=>({})},F={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"p-4"},[e("div",{staticClass:"text-2xl mb-4"},[this._v("\n        Settings\n    ")]),this._v(" "),e("div",[this._v("\n        There are currently no settings for you to configure\n    ")])])}]};var V=s("VU/8")(M,F,!1,function(t){s("2Gzn")},null,null).exports,B={name:"NewNote",components:{Btn:f},data:()=>({newTitle:null,newContent:null,newColor:null,feedback:null}),methods:{createNote(){let t=o.a.auth().currentUser.email;this.newTitle?this.newContent?this.newTitle&&this.newContent?(p.collection("users").doc(t).collection("notes").add({title:this.newTitle,content:this.newContent,color:this.newColor,uid:o.a.auth().currentUser.uid,timestamp:Date.now()}).catch(t=>{console.log(t)}),this.newTitle=null,this.newContent=null,this.feedback=null,this.toastMessage=null,this.$router.push({name:"Home"})):this.feedback="there was an error creating the note":this.feedback="content is required":this.feedback="title is required"},selectColor(t){const e=document.querySelectorAll(".color");for(var s=0;s<e.length;s++)e[s].classList.remove("border-gray-800");document.querySelector(`.bg-${t}-500`).classList.toggle("border-gray-800"),this.newColor=t}}},R={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"w-full p-4"},[t._m(0),t._v(" "),s("form",{attrs:{autocomplete:"off"},on:{submit:function(e){return e.preventDefault(),t.createNote(e)}}},[s("div",[s("label",{staticClass:"block py-3 lato-bold",attrs:{for:"new-message"}},[t._v("Title")]),t._v(" "),s("div",{staticClass:"flex justify-between"},[s("div",{staticClass:"flex-1 pr-2"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newTitle,expression:"newTitle"}],staticClass:"w-full outline-none shadow rounded-lg p-4 mb-2",attrs:{type:"text",name:"title"},domProps:{value:t.newTitle},on:{input:function(e){e.target.composing||(t.newTitle=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"flex justify-center items-center"},[s("div",[s("span",{staticClass:"color border-gray-100 border-solid border-2 inline-block cursor-pointer bg-red-500 rounded-full h-6 w-6 mr-1",on:{click:function(e){return t.selectColor("red")}}}),t._v(" "),s("span",{staticClass:"color border-gray-100 border-solid border-2 inline-block cursor-pointer bg-orange-500 rounded-full h-6 w-6 mr-1",on:{click:function(e){return t.selectColor("orange")}}}),t._v(" "),s("span",{staticClass:"color border-gray-100 border-solid border-2 inline-block cursor-pointer bg-yellow-500 rounded-full h-6 w-6 mr-1",on:{click:function(e){return t.selectColor("yellow")}}}),t._v(" "),s("span",{staticClass:"color border-gray-100 border-solid border-2 inline-block cursor-pointer bg-green-500 rounded-full h-6 w-6 mr-1",on:{click:function(e){return t.selectColor("green")}}}),t._v(" "),s("span",{staticClass:"color border-gray-100 border-solid border-2 inline-block cursor-pointer bg-blue-500 rounded-full h-6 w-6 mr-1",on:{click:function(e){return t.selectColor("blue")}}})])])])]),t._v(" "),s("div",[s("label",{staticClass:"block py-3 lato-bold",attrs:{for:"new-message"}},[t._v("Content")]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.newContent,expression:"newContent"}],staticClass:"w-full outline-none shadow rounded-lg p-4 h-64 mb-8",attrs:{type:"text",name:"content"},domProps:{value:t.newContent},on:{input:function(e){e.target.composing||(t.newContent=e.target.value)}}})]),t._v(" "),s("div",[s("Btn",{on:{click:t.createNote}},[t._v("Create")])],1),t._v(" "),t.feedback?s("div",{staticClass:"text-red-500 py-4"},[t._v(t._s(t.feedback))]):t._e()])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pb-8"},[e("a",{staticClass:"cursor-pointer text-gray-500 hover:underline",attrs:{href:"/home"}},[this._v("return back home")])])}]};var $=s("VU/8")(B,R,!1,function(t){s("IzYS")},null,null).exports;n.a.use(u.a);const D=new u.a({mode:"history",routes:[{path:"/signup",name:"Signup",component:j},{path:"/login",name:"Login",component:C},{path:"/home",name:"Home",component:q,props:!0,meta:{requiresAuth:!0}},{path:"/",name:"Home",component:q,props:!0,meta:{requiresAuth:!0}},{path:"/settings",name:"Settings",component:V,meta:{requiresAuth:!0}},{path:"/newNote",name:"NewNote",component:$,props:!0,meta:{requiresAuth:!0}}]});D.beforeEach((t,e,s)=>{if(t.matched.some(t=>t.meta.requiresAuth)){o.a.auth().currentUser?s():s({name:"Login"})}else s()});var O=D;s("7Cjr");n.a.config.productionTip=!1;let A=null;o.a.auth().onAuthStateChanged(()=>{A||(A=new n.a({el:"#app",router:O,components:{App:d},template:"<App/>"}))})},PjEI:function(t,e){},TxY8:function(t,e){},UZ1v:function(t,e){},agSC:function(t,e){},al5r:function(t,e){},ccR5:function(t,e){},uslO:function(t,e,s){var n={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-SG":"oYA3","./en-SG.js":"oYA3","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./ga":"U5Iz","./ga.js":"U5Iz","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it-ch":"/E8D","./it-ch.js":"/E8D","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ku":"kI9l","./ku.js":"kI9l","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function a(t){return s(o(t))}function o(t){var e=n[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}a.keys=function(){return Object.keys(n)},a.resolve=o,t.exports=a,a.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.e598cb5869119d8ff689.js.map