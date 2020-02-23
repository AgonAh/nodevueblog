<template>
    <div>
        {{message}}
        <div class="row">
            <div class="col-3"></div>
            <form v-on:submit="submitLogin();" class="text-left col-6">
                <div class="form-group">
                    <label for="username" style="a">Username</label>
                    <input type="text" class="form-control" v-model="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-success" >Login</button>
                <router-link to="/register" class="btn btn-secondary float-right" >Register</router-link>

            </form>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : "Login",
    data(){
        return{
            message : ""
        }
    },
    methods : {
        submitLogin(event){
            if(this.username!=null && this.password!=null){
                console.log(this.username+' | '+this.password);
                var user = {
                    username : this.username,
                    password : this.password
                }
                
                
                this.$emit('login',user);
                // this.$router.push('/');
            }
            else{
                this.message="Please fill out all the forms"
            }
            event.preventDefault();
        }
    }
}
</script>
