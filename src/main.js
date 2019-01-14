import Vue from "vue";
import App from "./App.vue";
import Login from "./views/Login.vue";
import Layout from "./views/layout/Layout.vue";
import router from "./router";
import * as firebaseui from "firebaseui";
import * as firebase from "firebase";
import * as firestore from "firebase/firestore";
import {config} from './helpers/fireConfig';
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';

Vue.use(VModal);
Vue.use(Notifications);
Vue.prototype.$collection = "";
Vue.prototype.$doc = "";
Vue.config.productionTip = false;
Vue.prototype.$firebase = firebase;
Vue.prototype.$firestore = firestore;
Vue.prototype.$firebaseui = firebaseui;
Vue.component('Layout', Layout);
Vue.component('Login', Login);


new Vue({
  router,
  created() {
    firebase.initializeApp(config);
    Vue.prototype.$db = firebase.firestore();
    this.$db.settings({
      timestampsInSnapshots: true
    });
    var docRef = this.$db.collection("Category").doc("SSCE").collection("General").doc("Biology").collection("Objectiive");

    //var docRef = db.collection("category/SSCE/General/Biology/Objective/1");

    /*docRef.add({
    Question: "What is a cell?",
    A: "unit of life",
    B: "unit of man",
    C: "unit of woman",
    D: "Non of the above",
    Correct: "unit of life",
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });*/

    /*docRef.set({
    Question: "What is a cell?",
    A: "unit of life",
    B: "unit of man",
    C: "unit of woman",
    D: "Non of the above",
    Correct: "unit of life",
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });*/

    /*docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });*/
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        Vue.prototype.$user = user;
        //console.log("user main "+this.$user);
      	if(user.uid === '59eiDrT3nRWyAkHlqigoze4tSiC3'){
        this.$router.push('/')
      	}else{
      	this.logOut();
      	alert("You are not autorized");
      	}
      } else{
        this.$router.push('/login');
      }
     });
    },
    methods:{
    logOut() { 
    this.$firebase.auth().signOut();
  }
},
  render: h => h(App)
}).$mount("#app");
