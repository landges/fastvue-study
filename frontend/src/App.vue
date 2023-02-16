<template>
    <div>
        <postForm />
        <postList :posts="posts"/>
    </div>
</template>

<script>
import { throwStatement } from '@babel/types';
import postForm from "@/components/postForm"
import postList from "@/components/postList"
export default {
    components:{
        postForm, postList
    },
    data(){
        return {
            posts:[
                {id: 1, title: "post1", discriprion:"first post in vue"},
                {id: 2, title: "post2", discriprion:"second post in vue"},
                {id: 3, title: "post3", discriprion:"thirth post in vue"},
            ],
            title:'',
            discriprion: '',
        }
    },
    methods:{
        createPost(){
            const newPost = {
                id: Date(),
                title: this.title,
                discriprion: this.discriprion,
            }
            this.posts.push(newPost);
            this.title = '';
            this.discriprion = '';
        },

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