<template>
  <div>

   <button class="btn btn-success btn-top" @click="add"><em class="fa fa-plus"></em> ADD</button>
   <button class="btn btn-primary btn-top" @click="getQuestions"><em class="fa fa-refresh"></em> RELOAD</button>

   <!-- <p class="t-ques">{{allQuestions.length}}</p> -->
   <button class="btn btn-secondary btn-circle margin" type="button">{{allQuestions.length}}</span></button>

   <div>
    <div class="btn-group">
      <button type="button" class="btn btn-danger" @click="subYear">Year -</button>
      <button type="button" class="btn btn-secondary">{{year}}</button>
      <button type="button" class="btn btn-success" @click="addYear">Year +</button>
    </div>
    <div>
      
    </div>
     <!--  <p v-for="(ques, index) in allQuestions">{{ques.Question}}</p> -->
     <div id="accordion" style="margin-top: 30px;">

      <div class="card question" v-for="(ques, index) in allQuestions" :key="index">
        <div class="card-header" :id="'heading'+index">
          <h5 class="mb-0">
            <div class="ques-head">
              <h6 class="collapsed" data-toggle="collapse" :data-target="'#collapse'+index" aria-expanded="true" aria-controls="collapseOne">
                {{index+1}} {{ques.Question}}
              </h6>
            </div>
            <p style="float: right;font-size: 10px">{{ques.time}}</p>
          </h5>
        </div>

        <div :id="'collapse'+index" class="collapse" :aria-labelledby="'heading'+index" data-parent="#accordion">
          <div class="card-body">
            <div class="cio-sm-10 mx-auto">
              <button class="btn btn-warning btn-circle margin btn-top" type="button" @click="edit(ques)"><span class="fa fa-edit"></span></button>
               <button class="btn btn-danger btn-circle margin btn-top" type="button" @click="deleteConfirm(ques.id)"><span class="fa fa-trash"></span></button>

              <div class="col-sm-6 mx-auto"><img :src="ques.img" :alt="ques.Question" class="ques-photo" v-if="ques.img"></div>
              <p class="option">
                A) {{ques.A}}
              </p>

              <p class="option">
                B) {{ques.B}}
              </p>

              <p class="option">
                C) {{ques.C}}
              </p>

              <p class="option">
                D) {{ques.D}}
              </p>

              <p class="correct">
                Correct Ans: {{ques.Correct}}
              </p>

              <p class="No">
                Question No: {{ques.No}}
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>

  <modal name="add" adaptive scrollable height="auto" :clickToClose="false">
   <div class="col-sm-10 mx-auto">
    <form  @submit.prevent>
      <div class="add-obj">
        <h3>ADD QUESTION</h3>
        <div class="form-group"> 
          <label>Question</label>
          <textarea class="form-control" v-model="question" row="4"></textarea>
        </div>
        <div class="form-group">
          <label>Question image(optional)</label>
          <input type="text" class="form-control" v-model="img"/>
        </div>
        <div class="form-group">
          <label>Option A</label>
          <textarea class="form-control" v-model="A" row="2"></textarea>
        </div>
        <div class="form-group">
          <label>Option B</label>
          <textarea class="form-control" v-model="B" row="2"></textarea>
        </div>
        <div class="form-group">
          <label>Option C</label>
          <textarea class="form-control" v-model="C" row="2"></textarea>
        </div>
        <div class="form-group">
          <label>Option D</label>
          <textarea class="form-control" v-model="D" row="2"></textarea>
        </div>
        <div class="form-group">
          <label>Correct Answer</label>
          <select type="option" class="form-control" v-model="correct">
            <option disabled selected>Choose Answer</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <div class="form-group">
          <label>Question Number</label>
          <input type="number" class="form-control" v-model="No"/>
        </div>

        <div class="alert alert-danger" v-if="errors.length">
          <p>
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </p>
        </div>

        <button class="btn btn-success" style="float: left;margin-bottom: 20px;" type="submit" @click="checkForm" v-if="action=='add'">ADD</button>

        <button class="btn btn-warning" style="float: left;margin-bottom: 20px;" type="submit" @click="checkForm" v-if="action=='edit'">EDIT</button>


        <button class="btn btn-danger" style="float: right;margin-bottom: 20px;" @click="close">CLOSE</button>

      </div>
    </form>
  </div>

</modal>

</div>
</template>
<script>

  export default {

    data () {
      return {
        action:"",
        errors:[],
        question:"",
        allQuestions:[],
        A:"",
        B:"",
        C:"",
        D:"",
        correct:"",
        img:null,
        doc:"",
        year:"",
        No:"",
      };
    },
    computed:{

    },
    methods:{
resetAll(){
  this.question = this.A = this.B = this.C = this.D = this.correct = this.doc = this.No ="";
  this.img = null;
},
add(){
  this.resetAll();
  this.$modal.show('add');
  this.action = "add";
},
edit(ques){
  this.question = ques.Question;
  this.A = ques.A;
  this.B = ques.B;
  this.C = ques.C;
  this.D = ques.D;
  this.correct = ques.Correct;
  this.img = ques.img;
  this.doc = ques.id;
  this.No = ques.No;
  this.$modal.show('add');
  this.action = "edit";
  //console.log(this.doc);
},
close(){
  this.$modal.hide('add');
},
checkForm: function (e) {
  this.errors = [];

  if (!this.question||!this.A||!this.B||!this.C||!this.D||!this.No||!this.correct) {
    this.errors.push('Fill Required Fields');
    return;
  }
  if (this.action=='add') {
  this.addObj();
    
  }else if (this.action == 'edit') {
    this.editObj();
  }

  e.preventDefault();
},
addObj(){
  var ques = {
    Question: this.question,
    quesImg:this.img,
    A: this.A,
    B: this.B,
    C: this.C,
    D: this.D,
    No:this.No,
    Correct: this.correct,
    timestamp: this.$firebase.firestore.FieldValue.serverTimestamp()
  }
      var addQues = this.$db.collection(this.$route.query.head);
      var _this = this;
      addQues.add(ques)
      .then(function(docRef) {
       console.log("Document written with ID: ", docRef.id);
       _this.$modal.hide('add');
       _this.$notify({
         title:"Add successful",
         text:"Question added with ID: "+docRef.id,
         position:'top right',
         type:'success'
       });

       _this.getQuestions();
       _this.resetAll();
     })
      .catch(function(error) {
       console.error("Error adding document: ", error);
       _this.$modal.hide('add');
       _this.$notify({
         title:"Add error",
         text:"Error adding question: "+ error,
         position:'top right',
         type:'error'
       });
     });
    },
    getQuestions(){
 var questions = [];
 this.dbQ = this.$db.collection(this.$route.query.head);
 this.dbQ.orderBy("timestamp", "desc").get()
 .then(snapshot => {
   snapshot.forEach(doc => {
          //console.log(doc.id);
          var date = new Date(doc.data().timestamp.seconds*1000).toGMTString();
          var obj  = {id:doc.id, Question:doc.data().Question, A:doc.data().A, B:doc.data().B, C:doc.data().C, D:doc.data().D, Correct:doc.data().Correct, time:date, img:doc.data().quesImg,No:doc.data().No};
          questions.push(obj);
           //questions[doc.id] = obj;
           //console.log(new Date(doc.data().timestamp.seconds*1000).toGMTString());
           

         });
 })
 .catch(err => {
   console.log('Error getting documents', err);
 });


 this.allQuestions = questions;
 console.log(this.allQuestions);
},
editObj(){
  var ques = {
    Question: this.question,
    quesImg:this.img,
    A: this.A,
    B: this.B,
    C: this.C,
    D: this.D,
    No: this.No,
    Correct: this.correct,
    timestamp: this.$firebase.firestore.FieldValue.serverTimestamp()
  }
      var editQues = this.$db.collection(this.$route.query.head).doc(this.doc);
      var _this = this;
      editQues.update(ques)
      .then(function() {
       console.log("Document updated with ID: ", _this.doc);
       _this.$modal.hide('add');
       _this.$notify({
         title:"Update successful",
         text:"Question updated with ID: "+_this.doc,
         position:'top right',
         type:'success'
       });

       _this.resetAll();
       _this.getQuestions();
     })
      .catch(function(error) {
       console.error("Error updating document: ", error);
       _this.$modal.hide('add');
       _this.$notify({
         title:"Add error",
         text:"Error updating question: "+ error,
         position:'top right',
         type:'error'
       });
     });
},
deleteConfirm(id){
  var r = confirm("Are you sure you want to delete "+id);
  if (r == true) {
   this.deleteQues(id);
 } else {

 }
},
deleteQues(id){
   var deleteQues = this.$db.collection(this.$route.query.head).doc(id);
   var _this = this;
   deleteQues.delete()
   .then(function() {
    console.log("Document deleted with ID: ", id);
    _this.$notify({
      title:"Delete successful",
      text:"Question deleted with ID: "+id,
      position:'top right',
      type:'success',
    });

    _this.resetAll();
    _this.getQuestions();
  })
   .catch(function(error) {
    console.error("Error deleting document: ", error);
    _this.$notify({
      title:"Delete error",
      text:"Error deleting question: "+ error,
      position:'top right',
      type:'error'
    });
  });
},
getYear(){
this.year = this.$route.query.head.match(/\d+/)[0];
return this.year;
},
addYear(){
  var year = this.getYear();
  this.year = parseInt(year) + 1;
  this.$route.query.head = this.$route.query.head.replace(year, this.year);
  this.$root.head = this.$route.query.head;
  this.getQuestions();
  console.log(this.$route.query.head);
},
subYear(){
  var year = this.getYear();
  this.year = parseInt(year) - 1;
  this.$route.query.head = this.$route.query.head.replace(year, this.year);
  this.$root.head = this.$route.query.head;
  this.getQuestions();
  console.log(this.$route.query.head);
}
},
watch:{

},
created(){
  this.getQuestions();
  this.getYear();
  
}
};
</script>
<style>
.add-obj{
  margin-top:30px;
  margin-bottom: 30px;
}
.t-ques{
  float: right;
}
</style>
