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
import Posts from "@/components/Posts";
import axios from "axios";
const BACK_URL = process.env.VUE_APP_BACK_URL;

export default {
  name: "home",
  components: {
    Posts,
  },
  data() {
    return {
      users: [],
    };
  },
  props: ["loggeduser"],
  mounted: function () {
    this.$root.$on("updatePosts", () => {
      // here you need to use the arrow function
      this.updatePosts();
    });
  },
  methods: {
    updatePosts: function () {
      axios
        .get(BACK_URL)
        .then((res) => {
          this.users = res.data;
          console.log(this.users);
          // console.log("!!!! URL IS :" + process.env.BACK_URL);
        })
        .catch((err) => {
          console.log(err);
          console.log("!!!! URL IS " + BACK_URL);
        });
    },
    userinfo: function () {
      axios
        .get(BACK_URL + "/userinfo", {
          withCredentials: true,
          xsrfCookieName: "csrftoken_testtest",
          xsrfHeaderName: "X-CSRFToken",
          sameSite: "none",
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    },
  },
  created() {
    //Auto runs on component creation
    this.updatePosts();
  },
};
</script>
