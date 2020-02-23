<template>
  <div id="app">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div class="bg-danger">{{msg}}</div>
    <Header  v-bind:user="user" v-on:logout="logout" v-bind:componentKey="componentKey" :key="componentKey" @inc="keyIncrement" />
    <div class="container">
      <router-view @login="login" @logout="logout" @setMsg="setMsg" v-bind:loggeduser="user" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from './components/Header'
export default {
  name:"App",
  components:{
    Header
  },
  data(){
    return {
      user : [],
      componentKey: 0,
      msg:''
    }
  },
  methods:{
    getLoggedUser : function(){
      axios.get('http://localhost:5000/userinfo',{withCredentials:true})
      .then(res=>{this.user = res.data; console.log(this.users)})
      .catch(err=>console.log(err));
    },
    login(user){
      axios.post('http://localhost:5000/login',user,{withCredentials : true})
      .then(res=>{this.user = res.data; console.log(this.users); this.$router.push('/')})
      .catch(err=>{console.log(err); this.setMsg("Couldn't log in")});
    },
    logout(){
      axios.get('http://localhost:5000/logout',{ withCredentials: true}).then(res=>{
        this.$router.push('/');
      });
      this.user = [];
      this.componentKey++;
      console.log(this.componentKey);
    },
    setMsg(message){
      this.msg=message;
      setTimeout(()=>{ this.msg="" }, 4000);
    },
    keyIncrement(){
      this.componentKey++;
    }
  },
  
  created(){
    this.getLoggedUser();
  }
}
</script>

<style>
body{
  /* background: #001935; */
  background: url('/bgr.jpg') no-repeat fixed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
