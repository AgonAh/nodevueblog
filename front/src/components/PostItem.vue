<template>
    <div class="post">
        <div class="postbody">
            <div class="username-area gradient"><router-link :to="'/blog/'+username"><h4>{{username}}</h4></router-link></div>
            <!-- <hr /> Restore if background colors returned to normal-->
            <h3>{{post.title}}</h3>
            <span>{{post.body}}</span>
        </div>
        <div class="end-post-bar gradient">
            <button class="icon">Interactions: 16</button>
            <span>
                <!-- near_me=share, favorite=heart -->
                <button class="icon"><i class="material-icons">all_inclusive</i></button>
                <button class="icon"><i class="material-icons">favorite_border</i> </button>
                <button class="icon" v-if="loggeduser && loggeduser.username && username == loggeduser.username"  v-on:click="del(post._id)"><i class="material-icons">delete</i> </button>
                <!-- <button @click="test">asd</button> -->
            </span></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : "PostItem",
    props : [
        "post",
        "username",
        "loggeduser"
        ],
    methods : {
        del : function(postId){
            axios.delete('http://localhost:5000/post/'+postId);
            // remove the element from the DOM
            axios.get('http://localhost:5000')
    .then(res=>{this.users = res.data; console.log(this.users)})
    .catch(err=>console.log(err));
            this.$el.parentNode.removeChild(this.$el);
        }
    }
}
</script>

<style scoped>
.post{
    background: #E8D1CD;
    color:#001935;
    text-align: start;
    margin-bottom: 25px;
    border-radius:5px;

    -webkit-box-shadow: 0px 0px 20px 0px rgba(220,58,198,1);
    -moz-box-shadow: 0px 0px 20px 0px rgba(220,58,198,1);
    box-shadow: 0px 0px 20px 0px rgba(220,58,198,1);
    
}
.postbody{
    padding:0,4;
    /* padding-top:0;
    padding-bottom:0; */

    font-size:1.2rem;
}
.username-area{
    width:100%;
    background: #FAFAFA;
    padding:0;
    margin-bottom:0;
    /* background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,25,53,1) 50%, rgba(255,255,255,1) 100%);} */
    /* background: linear-gradient(90deg, rgb(184, 0, 138) 0%, rgba(0,25,53,1) 50%, rgb(184, 0, 138) 100%); */
}
.username-area a{
    color:#CDAA00;
}
hr{
    padding:0;
    margin:0;
}
.gradient{
    background: rgb(0,25,53);
    background: linear-gradient(90deg, rgb(184, 0, 138) 0%, rgba(0,25,53,1) 50%, rgb(184, 0, 138) 100%);

}
.end-post-bar{
    display:flex;
    justify-content: space-between;
    /* background: #FAFAFA; */
    /* background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,25,53,1) 50%, rgba(255,255,255,1) 100%); */
    /* background: linear-gradient(90deg, rgb(184, 0, 138) 0%, rgba(0,25,53,1) 50%, rgb(184, 0, 138) 100%); */


    color:black;
    width:100%;
    border-radius:5px;
}
.end-post-bar button{
    color:#CDAA00;
}
.icon{
    border:0;
    /* background: inherit; */
    background:transparent;
}
button:focus {
    border: none;
    outline: none;
}
a,a.focus,a.active{
    text-decoration:none;
}

</style>