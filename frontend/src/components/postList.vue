<template>
    <div class="posts" v-for="post in posts">
        <div class="post">
            <div class="name"><strong>{{post.title}}</strong> {{post.discriprion}}</div>
        </div>
    </div>
</template>

<script>
export default{
    props:{
        posts:{
            type: Array,
            required: true,
        }
    }
}

</script>

<style scoped>
.post {
    margin: 10px 20px;
    padding: 10px 20px;
    width: 500px;
    border: 1px solid red;
}
.posts{
    display: block;
}
</style>