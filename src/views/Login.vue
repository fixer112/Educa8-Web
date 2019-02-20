<template lang="html">
  
  <div>
    <section class="h-100">
    <div class="container h-100">
      <div class="row justify-content-md-center h-100">
        <div class="card-wrapper">
          <!-- <div class="brand">
            <img src="img/logo.jpg">
          </div> -->
          <div class="card fat">
            <div class="card-body">
             <!--  <h4 class="card-title">Login</h4> -->
             <div id="firebaseui-auth-container"></div>
            </div>
          </div>
          <div class="footer">
            Copyright &copy; 2017 &mdash; Your Company 
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>
<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui'
import {config} from "@/helpers/fireConfig";
export default {
  name: 'auth',
   data () {
    return {
     title:"Login",
      
    };
  },
  mounted() {
    var uiConfig = {
      signInSuccessUrl: '/home',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        //firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        //firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ]
      };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
    this.changeTitle();
    },
}
</script>
<style lang="scss">
@import '../assets/css/my-login.css';
</style>