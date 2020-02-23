<template>
    <div class="">
        <h1>BLOG PAGE</h1>
        <div v-for="post in user.posts" v-bind:key="post._id">
            <PostItem v-bind:post="post" v-bind:loggeduser="loggeduser" v-bind:username="user.username"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PostItem from '@/components/PostItem';

export default {
    name : "Blog",
    props : [
        "posts",
        "loggeduser"
        ],
    components:{
        PostItem
    },
    data(){
        return{
            user : [],

        }
    },
    created(){
        console.log(123);
        axios.get('http://localhost:5000/user/'+this.$route.params.username)
        .then(response=> {
            this.user = response.data;
        })
        .catch(err=>console.log(err));
    }
}
</script>