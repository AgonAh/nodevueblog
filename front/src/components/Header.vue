<template>
    <nav class="navbar navbar-expand-lg ">
  <!-- <a class="navbar-brand" href="#">Navbar</a> -->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <!-- <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
        </li> -->
        <li class="nav-item">
            <router-link to="/newpost" :key="componentKey" v-if="user.name" class="nav-link">Create post</router-link>
        </li>
    </ul>

    <ul  class="ml-auto navbar-nav">
        <li class="nav-item">
            <router-link to="/login" class="nav-link" v-if="!user.name" :key="componentKey">Login</router-link>
        </li>
        <li class="nav-item ">
            <router-link :to="'/blog/'+user.username" :key="componentKey" v-if="user.name" class=" nav-link" >{{user.name}}</router-link>
        </li>
        <li class="nav-item ">
            <router-link :to="'/profile'"  :key="componentKey"  v-if="user.name"  class=" nav-link" >Profile</router-link>
        </li>
        <li class="nav-item">
            <a @click="$emit('logout')" class="nav-link" href="#" :key="componentKey" v-if="user.name">Logout</a>
        </li>
    </ul>
  </div>
</nav>
</template>
<script>
import axios from 'axios';
export default {
    name:"Header",
    props:[
        "user",
        "componentKey"
    ]
}
</script>
<style scoped>
nav{
    margin-bottom:10vh;
}
a{
    color:white;
}
</style>