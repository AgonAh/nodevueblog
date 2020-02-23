<template>
  <div class="home">
    <div class="container">
      <!-- <div :key="$route.redirectedFrom"></div> -->
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <Posts v-bind:users="users" v-bind:loggeduser="loggeduser" />
        </div>
      </div>
      <!-- <button @click="userinfo" >User info</button> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts';
import axios from 'axios';


export default {
  name: 'home',
  components: {
    Posts
  },
  data(){
    return {
      users : [],
    }
  },
  props:[
    "loggeduser"
  ],
  mounted: function () { 
    this.$root.$on('updatePosts', () => { // here you need to use the arrow function
     this.updatePosts();
    })
  },
  methods:{
    updatePosts : function(){
      axios.get('http://localhost:5000')
      .then(res=>{this.users = res.data; console.log(this.users)})
      .catch(err=>console.log(err));
    },
    userinfo : function(){
      axios.get('http://localhost:5000/userinfo',{
                    withCredentials: true,
                    xsrfCookieName: 'csrftoken_testtest',
                    xsrfHeaderName: 'X-CSRFToken',
                })
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err))
    }
  },
  created(){ //Auto runs on component creation
    this.updatePosts();
  }

}
</script>
