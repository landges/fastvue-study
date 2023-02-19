<template>
    <div class="post">
        <div class="name"><strong>{{post.title}}</strong> {{post.discription}}</div>
        <div class="btns">
            <my-button @click="$emit('remove',post)">Delete</my-button>
        </div>
    </div>
</template>

<script>

export default{

    props:{
        post:{
            type: Object,
            required:true,
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
    display: flex;
    align-items: center;
    justify-content: space-between;
}

</style>