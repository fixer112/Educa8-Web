<template>
  <div id="app">
    <notifications/>
    <component :is="layout"/>
    </div>
   
  
</template>
<script>
  //import Login from "@/views/Login.vue";
export default {
  
  data () {
    return {
      
    };
  },
  computed:{
    layout(){
      return (this.$route.meta.layout || "Layout");
    }
  },
  methods:{
    logOut() { 
    this.$firebase.auth().signOut();
    //window.location.reload(true);
    //this.$router.push('/login');
  }
},
watch:{

},
created(){
  /*this.user = this.$firebase.auth().currentUser; 
  if(this.user) { 
    this.phoneNumber = this.user.phoneNumber
    this.name = this.user.displayName; 
    this.email = this.user.email; 
    this.photo = this.user.photoURL; 
    this.userId = this.user.uid; 
  } */
  //console.log("user "+JSON.stringify(this.user));
  //this.current = this.$router.currentRoute.name;
  //document.title = "New";
  //console.log(this.current);
  }
};
</script>
<style>
#app { 
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.photo{
  height: 50px;
  width: 50px;
  border-radius:20px;
}
</style>
