<template>
  <div class="col-md-8 mx-auto">
  	<form @submit.prevent="checkForm">

    <div class="form-group">
        <label>SSCE</label>
        <select type="option" class="form-control" v-model="ssce">
        <option disabled selected>Choose SSCE</option>
        <option value="jamb">JAMB</option>
        <option value="waec">WAEC</option>
        </select>
    </div>

     <div class="form-group">
        <label>Category</label>
        <select type="option" class="form-control" v-model="category" @change="subject=''">
        <option disabled selected>Choose Categoty</option>
        <option value="general">General</option>
        <option value="science">Science</option>
        <option value="commercial">Commercial</option>
        <option value="art">Art</option>
        </select>
    </div>
    <div class="form-group">
        <label>Subject</label>
        <select type="option" class="form-control" v-model="subject">
        <option disabled selected>Choose Subject</option>
        <template v-if="category" >
        <option v-for="(sub, index) in subjects[category]" :value="sub" :key="index">{{sub.toUpperCase()}}</option>
        </template>
        </select>
    </div>
  	 <div class="form-group">
        <label>Year</label>
        <input type="number" class="form-control" v-model="year"/>
    </div>
  	 <div class="form-group">
        <label>Type</label>
        <select type="option" class="form-control" v-model="type">
        <option disabled selected>Choose Type</option>
        <option value="objective">Objective</option>
        </select>
    </div>

    <div class="alert alert-danger" v-if="errors.length">
    <p>
  	    <b>Please correct the following error(s):</b>
  	    <ul>
  	      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
  	    </ul>
  	  </p>
  	 </div>

    <button class="btn btn-success" type="submit">Submit</button>
	</form>
  </div>
</template>
<script>

export default {
  
  data () {
    return {
    errors:[],
  	ssce:"",
  	category:"",
  	subjects:{
  		"general":{"1":"math","2":"english","3":"biology","4":"yoruba","5":"igbo","6":"hausa","7":"economics"},
  		"science":{"1":"physics","2":"chemistry","3":"agric"},
  		"commercial":{"1":"insurance","2":"account","3":"commerce"},
  		"art":{"1":"literature","2":"goverment"}
  },
  	year:"",
  	type:"",
  	subject:"",
    };
  },
  computed:{

  },
  methods:{
  	checkForm: function (e) {
      this.errors = [];

      if (!this.ssce||!this.category||!this.year||!this.type||!this.subject) {
        this.errors.push('All fields required');
        return;
      }


      if (this.year < 1970 || this.year > 2020) {
        this.errors.push('Year must be between 1970 and 2020');
        return;
      }

      var collection = this.ssce+'_'+this.subject+'_'+this.year+'_'+this.type;
      //console.log(this.$collection);
      this.$router.push({path:'obj_questions/',query:{head:collection}});
      e.preventDefault();
    }
},
watch:{
	category(n){

	}
},
created(){
}
	
};
</script>
<style>

</style>
