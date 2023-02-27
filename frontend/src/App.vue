<template>
    <div>
        <h1>Page with posts</h1>
        <my-input
        v-model="searchQuery"
        placeholder="Search..."
        />
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
        :posts="sortedAndSearchPosts"
        @remove="removePost"
        v-if="!isPostLoading"
        />
        <div v-else>
            Loading....
        </div>
        <div class="page__wrapper">
            <div v-for="pageNumber in totalPage" 
            :key="pageNumber"
            class="page"
            :class="{
                'current__page': page === pageNumber
            }"
            @click="changePage(pageNumber)">
                {{ pageNumber }}
            </div>
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
            searchQuery:'',
            page:1,
            limit:10,
            totalPage:1,
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
        changePage(pageNumber){
            this.page=pageNumber;
            this.fetchPosts();
        },
        async fetchPosts(){
            try{
                this.isPostLoading =true;
                const response = await axios.get('http://127.0.0.1:8000/api/posts',{
                    params:{
                        page: this.page,
                        limit:this.limit,
                    }
                });
                this.totalPage = 10;
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
        },
        sortedAndSearchPosts(){
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
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
.app{
    margin: auto;
}
.app__btns{
    width: 500px;
    display: flex;
    justify-content: space-between;
}
.page__wrapper{
    display: flex;
    margin-top: 15px;
}
.page{
    border: 1px solid black;
    padding: 10px;
    margin-right: 5px;
}
.current__page{
    border:2px solid teal;
}
</style>