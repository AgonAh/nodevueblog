<template>
    <div>
        <div class="row">
            <div class="col-3"></div>
            <form v-on:submit="submitRegister" class="text-left col-6">
                <!-- Name, username, password -->
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" placeholder="Name" class="form-control" v-model="name" required>
                </div>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" placeholder="Username" v-model="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" placeholder="Password" v-model="password" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm password</label>
                    <input type="password" class="form-control" placeholder="Confirm password" v-model="confirmPassword" required>
                </div>
                <button type="submit" class="btn btn-success">Register</button>
                <router-link to="/login" class="btn btn-secondary float-right" >Login</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name : "Register",
    // data(){
    //     return{
    //         message : ""
    //     }
    // },
    methods : {
        submitRegister(event){
            if(this.name != null && this.username!=null && this.password!=null){
                console.log(this.name + ' | '+this.username+' | '+this.password +' | '+this.confirmPassword );
                if(this.password!=this.confirmPassword){
                    this.$emit('setMsg','Passwords do not match');
                }
                else{
                    var user = {
                    name : this.name,
                    username : this.username,
                    password : this.password
                }
                axios.post('http://localhost:5000/register',user);
                this.$router.push('/login');
                }
            }
            else{
                this.$emit('setMsg','Please fill out all the forms');

            }

            event.preventDefault();
        }
    }
}
</script>