<template>
    <div>
        <h1>Page with posts</h1>
        <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Search..."
        />
        <div class="app__btns">
            <!-- <my-button
            @click="showDialog"
            >Create post</my-button> -->

            <my-select
            v-model="selectedSort"
            :options="sortOptions"
            />
        </div>
        
        <!-- <my-dialog v-model:show="dialogVisible">
            <postForm 
            @create="createPost"
            />
        </my-dialog> -->
        
        <postList 
        :posts="sortedAndSearchPosts"
        @remove="removePost"
        v-if="!isPostLoading"
        />
        <div v-else>
            Loading....
        </div>
        <!-- <div v-intersection="loadMorePosts" class="observer"></div> -->
    </div>
</template>

<script>
import { throwStatement } from '@babel/types';
import postForm from "@/components/postForm"
import postList from "@/components/postList"
import axios from 'axios'
import MySelect from "@/components/UI/MySelect"
import {ref} from 'vue'
import usePosts from '@/hooks/usePosts';
import useSortedPosts  from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';

export default {
    components:{
        postForm, postList, MySelect
    },
    data(){
        return {
            dialogVisible:false,
            sortOptions:[
                {value:"id",name:"by id"},
                {value:"title",name:"by name"},
                {value:"discrition",name:"by dsc"}
            ]
        }
    },
    setup(props){
        const {posts, isPostLoading, totalPage} = usePosts(10);
        const {selectedSort, sortedPosts } = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchPosts} = useSortedAndSearchedPosts(sortedPosts);
        return {
            posts, 
            isPostLoading, 
            totalPage,
            selectedSort, 
            sortedPosts,
            searchQuery, 
            sortedAndSearchPosts
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
.observer{
    height: 20px;
    background-color: red;
}
</style>