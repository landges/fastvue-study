<template>
    <form action="" class="form" @submit.prevent>
            <input 
            type="text" 
            v-bind:value="post.title"
            @input="post.title = $event.target.value" 
            name="title" 
            id="title" 
            placeholder="title">

            <input 
            type="text" 
            v-bind:value="post.discriprion"
            @input="post.discriprion = $event.target.value" 
            name="discription" 
            id="discription" 
            placeholder="discription">

            <input 
            type="button" 
            value="Create" 
            class="submit" 
            @click="createPost">
        </form>
</template>

<script>
export default{
    data(){
        return {
            post:{
                title:'',
                discriprion:''
            }
        }
    }
}
</script>

<style scoped>
.form{
    margin: 20px;
    display: flex;
    flex-direction: column;
}
input{
    margin-top: 10px;
    padding: 10px 15px;
}
.submit{
    align-self: flex-start;
    background:none;
    border: 1px solid black;
}
</style>