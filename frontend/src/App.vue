<template>
    <div>
        <h1>Page with posts</h1>
        <div class="app__btns">
            <my-button
            @click="showDialog"
            >Create post</my-button>

            <my-select
            v-model="selectedSort"
            :options="sortOptions"
            />
        </div>
        
        <my-dialog v-model:show="dialogVisible">
            <postForm 
            @create="createPost"
            />
        </my-dialog>
        
        <postList 
        :posts="sortedPosts"
        @remove="removePost"
        v-if="!isPostLoading"
        />
        <div v-else>
            Loading....
        </div>
    </div>
</template>

<script>
import { throwStatement } from '@babel/types';
import postForm from "@/components/postForm"
import postList from "@/components/postList"
import axios from 'axios'
import MySelect from "@/components/UI/MySelect"


export default {
    components:{
        postForm, postList, MySelect
    },
    data(){
        return {
            posts:[],
            dialogVisible:false,
            isPostLoading: false,
            selectedSort: '',
            sortOptions:[
                {value:"id",name:"by id"},
                {value:"title",name:"by name"},
                {value:"discrition",name:"by dsc"}
            ]
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
                this.isPostLoading =true;
                const response = await axios.get('http://127.0.0.1:8000/api/posts');
                this.posts = response.data.posts;
            }
            catch(e){
                alert("Error");
            }
            finally{
                this.isPostLoading = false;
            }
        }

    },
    mounted(){
        this.fetchPosts();
    },
    computed:{
        sortedPosts(){
            return [...this.posts].sort((post1,post2)=>post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        }
    },
    watch:{
        
    }
}
</script>

<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.app__btns{
    width: 500px;
    display: flex;
    justify-content: space-between;
}
</style>