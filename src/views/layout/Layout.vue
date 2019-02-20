<template>
  <div class="container-fluid" id="wrapper">
    <div class="row">
      <nav class="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2">
        <h1 class="site-title"><router-link to="/" tag="a"><em class="fa fa-rocket"></em> Educa8</router-link></h1>
                          
        <a href="#menu-toggle" class="btn btn-default" id="menu-toggle"><em class="fa fa-bars"></em></a>
        <ul class="nav nav-pills flex-column sidebar-nav">
          <!-- <li class="nav-item"><a class="nav-link active" href="index.html"><em class="fa fa-dashboard"></em> Dashboard <span class="sr-only">(current)</span></a></li> -->
          <router-link to="/" tag="li" class="nav-link" exact-active-class="active"><em class="fa fa-dashboard"></em> Dashboards</router-link>
           <router-link to="/ssce" tag="li" class="nav-link" exact-active-class="active"><em class="fa fa-dashboard"></em> SSCE</router-link>
          
     <!--  <a href="#" class="logout-button" @click="logOut"><em class="fa fa-power-off"></em> Signout</a> -->
        </ul>
      </nav>
      <main class="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
        <header class="page-header row justify-center">
          <div class="col-md-6 col-lg-8" >
            <h5 class="float-left text-center text-md-left head">{{$root.head}}</h5>
          </div>
          <div class="dropdown user-dropdown col-md-6 col-lg-4 text-center text-md-right"><a class="btn btn-stripped dropdown-toggle" href="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img :src="photo" alt="profile photo" class="circle float-left profile-photo" width="50" height="auto">
            <div class="username mt-1">
              <h4 class="mb-1">{{name}}</h4>
              <h6 class="text-muted">{{email}}</h6>
            </div>
            </a>
            <div class="dropdown-menu dropdown-menu-right" style="margin-right: 1.5rem;" aria-labelledby="dropdownMenuLink">
                <!-- <a class="dropdown-item" href="#"><em class="fa fa-user-circle mr-1"></em> View Profile</a>
                 <a class="dropdown-item" href="#"><em class="fa fa-sliders mr-1"></em> Preferences</a> -->
                 <a class="dropdown-item" href="#" @click="logOut"><em class="fa fa-power-off mr-1"></em> Logout</a></div>
          </div>
          <div class="clear"></div>
        </header>
        <section class="row">
          <div class="col-sm-12">
            <router-view/>
          </div>
        </section>
      </main>
    </div>
  </div>  
 
</template>
<script>
  import Login from "@/views/Login.vue";
  import Vue from "vue";
  import * as firebase from "firebase";
export default {
  components: {
    Login
  },
  
  data () {
    return {
      name:"",
      email:"",
      photo:"",
      userId:"",
      phoneNumber:"",
      current:"",
      
    };
  },
  methods:{
    logOut() { 
    this.$firebase.auth().signOut();
    //window.location.reload(true);
    //this.$router.push('/login');
  },
  /*changeHead(){
    this.head = this.$route.meta.head? this.$route.meta.head.toUpperCase() : this.$route.query.head.toUpperCase() ;
  }*/
},
watch:{

},
updated(){
this.changeHead();
//console.log('Head '+this.head);
},
mounted(){
  var u = firebase.auth();

  //console.log(firebase.auth());
  this.changeHead();
	
	//this.$refs.ssce.className=this.$refs.ssce.className+" active";
	var User;
	firebase.auth().onAuthStateChanged((user) => {
	  if (user) {
	    // User is signed in.
	    User = user;
	    this.name = user.displayName; 
	    this.email = user.email;
	    this.photo = user.photoURL; 
	    this.userId = user.uid;
	    //console.log("user "+JSON.stringify(this.name));
	  } else {
	    // No user is signed in.
	  }
	});
  /*this.name = window.user.displayName; 
  this.email = window.user.email;
  this.photo = window.user.photoURL; 
  this.userId = window.user.uid;*/
  //console.log(window.user);
  }
};
</script>
<style>
  .head {
    word-break: break-all;
}
</style>