<template>
  <div>
    <div
      style="background-color:rgba(184, 0, 138,50%); color:white; width: 100%"
    >
      {{ msg }}
    </div>
    <form @submit="submitAxios">
      <div class="form-group row">
        <label class="form-control col-2">Name</label>
        <input
          type="text"
          class="form-control col-10"
          v-model="user.name"
          required
        />
      </div>
      <div class="form-group row">
        <label class="form-control col-2">Username</label>
        <input
          type="text"
          class="form-control col-10"
          v-model="user.username"
          required
        />
      </div>
      <div class="form-group row">
        <label class="form-control col-2">New password</label>
        <input
          type="password"
          class="form-control col-10"
          v-model="newPassword"
          placeholder="********"
        />
      </div>
      <div class="form-group row">
        <label class="form-control col-2">Confirm password</label>
        <input
          type="password"
          class="form-control col-10"
          v-model="confirmPassword"
          placeholder="********"
        />
      </div>
      <button type="submit" class="form-control col-2 mr-auto">
        Update profile
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Profile",

  props: ["user"],
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    submitAxios() {
      let userDetails = {};
      let passed = true;
      userDetails.username = this.user.username;
      userDetails.name = this.user.name;
      //Check for password
      if (this.newPassword != null) {
        if (this.newPassword.length > 7) {
          if (this.newPassword == this.confirmPassword) {
            //All passed
            userDetails.password = this.newPassword;
          } else {
            //Passwords do not match
            this.msg = "Passwords do not match";
            passed = false;
          }
        } else {
          //Password too short
          this.msg = "Password too short";
          passed = false;
        }
      }
      // else{
      //     //No password typed
      // }
      if (passed) {
        axios
          .put(process.env.VUE_APP_BACK_URL + "/updateUser", userDetails, {
            withCredentials: true,
          })
          .then((res) => {
            this.msg =
              "Please log out and log back in for effects to take place";
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
