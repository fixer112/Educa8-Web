import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import SSCE from "./views/SSCE.vue";
import Obj from "./views/SSCE/Obj.vue";

Vue.use(Router);

Vue.mixin({
 data() {
    return {
      title:"",
    }
},

methods:{
  changeTitle(){
    document.title = "Educa8 | "+this.title;
  },
  logOut() { 
    this.$firebase.auth().signOut();
  }
},
  mounted(){
  //this.changeTitle();
  /*this.user = this.$firebase.auth().currentUser; 
  if(this.user) { 
    this.phoneNumber = this.user.phoneNumber
    this.name = this.user.displayName; 
    this.email = this.user.email;
    this.photo = this.user.photoURL; 
    this.userId = this.user.uid; 
  } 
  console.log("user "+JSON.stringify(this.$firebase.auth().currentUser));*/
},
updated(){

},
created(){

 // }
}

})

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      meta:{layout:"Login"},
      component: Login

    },
    {
      path: "/",
      name: "home",
      component: Home,
      meta:{head:"Dashboard"},
    },
    {
      path: "/ssce",
      name: "ssce",
      component: SSCE,
      meta:{head:"SSCE"},
    },
    {
      path: "/obj_questions",
      name: "obj",
      component: Obj,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
