import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import FeedView from '@/views/FeedView.vue'
import SearchView from '@/views/SearchView.vue'
import ProfileView from '@/views/ProfileView.vue'
import FriendsView from '@/views/FriendsView.vue'
import PostView from '@/views/PostView.vue'
import ChatView from '@/views/ChatView.vue'
import TrendView from '@/views/TrendView.vue'
import ProfileEditView from '@/views/EditProfileView.vue'

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
    {
      path: '/:id',
      name: 'post',
      component: PostView,
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
    },
    {
      path: '/trends/:id',
      name: 'trendview',
      component: TrendView,
    },
    {
      path: '/profile/edit',
      name: 'profileedit',
      component: ProfileEditView,
    },
  ],
})

export default router
