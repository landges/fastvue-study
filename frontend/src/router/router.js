import Main from '@/pages/Main'
import PostPage from "@/pages/PostPage"
import About from "@/pages/About"
import PostDetail from "@/pages/PostDetail"
import PostPageVuex from "@/pages/PostPageVuex"
import PostPageCompositionApi from "@/pages/PostPageCompositionApi"
import { createRouter, createWebHistory } from 'vue-router'

const routes =[
    {
        path: '/',
        component:Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/store',
        component: PostPageVuex
    },
    {
        path: '/composition',
        component: PostPageCompositionApi
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostDetail
    },
]
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;