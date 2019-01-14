<template>

</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import * as firebase from "firebase";
import * as firestore from "firebase/firestore";

export default {

  data () {
    return {
      title:"Home",

    };
  },
  methods:{
    },
  mounted(){
  	this.changeTitle();
  } 

};
</script>
