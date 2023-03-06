<template>
    <div>
        
        <h1>Page with posts</h1>
        <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Search..."
        />
        <div class="app__btns">
            <my-button
            @click="showDialog"
            >Create post</my-button>

            <my-select
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
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
        <!-- <div class="page__wrapper">
            <div v-for="pageNumber in totalPage" 
            :key="pageNumber"
            class="page"
            :class="{
                'current__page': page === pageNumber
            }"
            @click="changePage(pageNumber)">
                {{ pageNumber }}
            </div>
        </div> -->
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
import { throwStatement } from '@babel/types';
import postForm from "@/components/postForm"
import postList from "@/components/postList"
import axios from 'axios'
import MySelect from "@/components/UI/MySelect"
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';

export default {
    components:{
        postForm, postList, MySelect
    },
    data(){
        return {
            dialogVisible:false,
        }
    },
    methods:{
        ...mapActions({
            loadMorePosts : 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort:'post/setSelectedSort'
        }),
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
        // changePage(pageNumber){
        //     this.page=pageNumber;
        // },
        

    },
    mounted(){
        this.fetchPosts();
        
    },
    computed:{
        ...mapGetters({
            sortedPosts:'post/sortedPosts',
            sortedAndSearchPosts:'post/sortedAndSearchPosts'
        }),
        ...mapState({
            posts:state=>state.post.posts,
            dialogVisible:state=>state.post.dialogVisible,
            isPostLoading: state=>state.post.isPostLoading,
            selectedSort: state=>state.post.selectedSort,
            searchQuery:state=>state.post.searchQuery,
            page:state=>state.post.page,
            limit:state=>state.post.limit,
            totalPage:state=>state.post.totalPage,
            sortOptions:state=>state.post.sortOptions
        })
    },
    watch:{
        // page(){
        //     this.fetchPosts();
        // }
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