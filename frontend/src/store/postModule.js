import axios from "axios";

export const postModule = {
    state:()=>({
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
    }),
    getters:{
        sortedPosts(state){
            return [...state.posts].sort((post1,post2)=>post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchPosts(state, getters){
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    },
    mutations:{
        setPosts(state, posts){
            state.posts=posts;
        },
        setLoading(state,isPostLoading){
            state.isPostLoading = isPostLoading;
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery;
        },
        setPage(state,page){
            state.page = page;
        },
        setTotalpage(state,totalPage){
            state.totalPage=totalPage;
        },


    },
    actions:{
        async fetchPosts({state,commit}){
            try{
                commit('setLoading',true);
                const response = await axios.get('http://127.0.0.1:8000/api/posts',{
                    params:{
                        page: state.page,
                        limit: state.limit,
                    }
                });
                commit('setTotalpage',10);
                commit('setPosts', response.data.posts);
            }
            catch(e){
                console.log(e);
                alert("Error");
            }
            finally{
                commit('setLoading',false);
            }
        },
        async loadMorePosts({state,commit}){
            try{
                commit('setPage', state.page+=1);
                // this.isPostLoading =true;
                const response = await axios.get('http://127.0.0.1:8000/api/posts',{
                    params:{
                        page: state.page,
                        limit: state.limit,
                    }
                });
                commit('setTotalpage',10);
                commit('setPosts', [...state.posts, ...response.data.posts]);
            }
            catch(e){
                alert("Error");
                console.log(e);
            }
            finally{
                alert("error");
                // this.isPostLoading = false;
            }
        }
    },
    namespaced:true
}