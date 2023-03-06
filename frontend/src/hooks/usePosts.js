import {ref, onMounted} from "vue"
import axios from "axios";

export default function usePosts(limit){
    const posts = ref([]);
    const totalPage = ref(0);
    const isPostLoading = ref(true);
    const fetching = async ()=>{
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/posts',{
                params:{
                    page: 1,
                    limit:limit,
                }
            });
            totalPage.value = 10;
            posts.value = response.data.posts;
        }
        catch(e){
            alert("Error");
        }
        finally{
            isPostLoading.value = false;
        }
    }
    onMounted(fetching)
    return {posts, isPostLoading, totalPage}
}