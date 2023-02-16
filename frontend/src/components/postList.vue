<template>
    <div>
        <h3>List posts</h3>
        <div class="posts">
            <postItem 
            v-for="post in posts"
            :post="post"
            />
        </div>
    </div>
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