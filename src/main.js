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

Vue.mixin({
  data () {
    return {
    };
   
  },
  methods:{
    changeHead(){
    this.$root.head = this.$route.meta.head? this.$route.meta.head.toUpperCase() : this.$route.query.head.toUpperCase() ;
  },
  }
});

new Vue({
  router,
  data () {
    return {
      head:'',
    };
   
  },
  created() {
    firebase.initializeApp(config);
    Vue.prototype.$db = firebase.firestore();
    this.$db.settings({
      timestampsInSnapshots: true
    });
    
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        Vue.prototype.$user = user;
        window.user = user;
        //console.log("user main "+this.$user);
        var admin = ['abula3003@gmail.com','ayblinxx2013@gmail.com','scopeman8@gmail.com'];
      	if(admin.includes( user.email)){
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
  },
  
},
  render: h => h(App)
}).$mount("#app");
