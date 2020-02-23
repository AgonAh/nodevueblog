<template>
  <div>
      <div>{{message}}</div>
      <form v-on:submit="sub">
          <input type="text" class="form-control" v-model="title" placeholder="Title">
          <textarea name="body" placeholder="Body" class="form-control" v-model="body"></textarea>
          <button type="submit" class="btn btn-success">Create</button>
      </form>
  </div>
</template>

<style scoped>
textarea{
  min-height:20vh;
}
.btn{
  width:100%;
}
</style>



<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Newpost',
  components: {
    
  },
  data(){
    return {
        message : "",
    }
  },
  methods : {
      sub : function(event){

          if(this.title!=null || this.body!=null){
              var newpost = {
                title : this.title,
                body : this.body
            }
            axios.post('http://localhost:5000/addPost',newpost,{withCredentials:true}); //TODO::Replace id
            this.$root.$emit('updatePosts');
            this.$router.push('/');
          }
          else{
              this.message = 'Please fill out at least one of the fields'
          }
          
          event.preventDefault();
      }
  },
  created(){ //Auto runs on component creation

  }

}
</script>
