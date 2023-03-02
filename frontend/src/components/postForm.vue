<template>
    <form action="" class="form" @submit.prevent>
            <my-input 
            v-focus
            v-model="post.title"
            name="title" 
            id="title" 
            placeholder="title"/>

            <my-input 
            v-model="post.discription"
            name="discription" 
            id="discription" 
            placeholder="discription"/>

            <my-button 
            @click="createPost"
            >Create</my-button>
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
    },
    methods: {
      createPost(){
        this.post.id = Date.now();
        this.$emit('create', this.post);
        this.post = {
            title:'',
            discriprion:''
        }
      }  
    },
}
</script>

<style scoped>
.form{
    margin: 20px;
    display: flex;
    flex-direction: column;
}


</style>