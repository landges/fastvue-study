<template>
    <div>
        <h1>Page with posts</h1>
        <my-button @click="fetchPosts">Get posts from fast API</my-button>
        <my-button
        @click="showDialog"
        >Create post</my-button>
        <my-dialog v-model:show="dialogVisible">
            <postForm 
            @create="createPost"
            />
        </my-dialog>
        
        <postList 
        :posts="posts"
        @remove="removePost"
        />
    </div>
</template>

<script>
import { throwStatement } from '@babel/types';
import postForm from "@/components/postForm"
import postList from "@/components/postList"
import axios from 'axios'

export default {
    components:{
        postForm, postList
    },
    data(){
        return {
            posts:[],
            dialogVisible:false,
        }
    },
    methods:{
        createPost(post){
            this.posts.push(post);
            this.dialogVisible=false;
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog(){
            this.dialogVisible=true;
        },
        async fetchPosts(){
            try{
                const response = await axios.get('http://127.0.0.1:8000/posts');
                this.posts = response.data.posts;
            }
            catch(e){
                alert("Error")
            }
        }

    }
}
</script>

<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

</style>