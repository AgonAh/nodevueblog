<template>
    <div>
        <div v-for="user in users" v-bind:key="user._id">
            <div v-for="post in user.posts" v-bind:key="post._id">
                <PostItem v-bind:post = "post" v-bind:loggeduser="loggeduser" v-bind:username="user.username" />
            </div>
        </div>
    </div>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
    name : "Posts",
    components : {
        PostItem
    },
    props : [
        "users",
        "loggeduser"
    ]
}
</script>

<style scoped>

</style>