import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import FeedView from '../views/FeedView.vue'
import MessagesView from '../views/MessagesView.vue'
import SearchView from '../views/SearchView.vue'
import ProfileView from '../views/ProfileView.vue'
import FriendsView from '../views/FriendsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/signup',
            name: 'signup',
            component: SignupView,
        },
        {
            path: '/feed',
            name: 'feed',
            component: FeedView,
        },
        {
            path: '/messages',
            name: 'messages',
            component: MessagesView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/search',
            name: 'search',
            component: SearchView,
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component: ProfileView,
        },
        {
            path: '/profile/:id/friends',
            name: 'friends',
            component: FriendsView,
        },
    ],
})

export default router
