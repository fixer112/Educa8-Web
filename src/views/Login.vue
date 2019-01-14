<template lang="html">
  
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper auth-page">
      <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
        <div class="row w-100">
          <div class="col-lg-4 mx-auto">
            <div class="auto-form-wrapper">
              <div id="firebaseui-auth-container"></div>
            </div>
            <ul class="auth-footer">
              <!-- <li>
                <a href="#">Conditions</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li> -->
            </ul>
            <!-- <p class="footer-text text-center">copyright © 2018 Bootstrapdash. All rights reserved.</p> -->
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
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
<style>
/*body {
  background-image: url("/images/login.jpg");
}*/

</style>