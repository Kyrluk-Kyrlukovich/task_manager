import {createRouter, createWebHistory} from 'vue-router'
import LoginForm from "@/components/LoginForm";
import MainFull from "@/components/MainFull";
import SignupForm from "@/components/SignupForm";
import ChannelSettings from "@/components/ChannelSettings";

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
    },
    {
        name:'channelSettings',
        path: '/channel/:id/settings',
        component: ChannelSettings
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
