<template>
    <div v-if="posts.length > 0">
        <h3>List posts</h3>
        <div class="posts">
            <postItem 
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove',post)"
            />
        </div>
    </div>
    <h2 v-else>Posts is empty</h2>
</template>

<script>
import postItem from '@/components/postItem';
export default{
    components:{
        postItem,
    },
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