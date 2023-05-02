import {createRouter, createWebHistory} from 'vue-router'
import LoginForm from "@/components/LoginForm";
import MainFull from "@/components/MainFull";
import SignupForm from "@/components/SignupForm";

const routes = [

    {
        name: 'main',
        path: '/',
        component: MainFull
    },

    {
        name: 'login',
        path: '/login',
        component: LoginForm
    },

    {
        name: 'signup',
        path: '/signup',
        component: SignupForm
    },

    {
        name:'channel',
        path: '/channel/:id',
        component: MainFull
    },
    {
        name:'choosenDay',
        path: '/channel/:id/day',
        component: MainFull
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
