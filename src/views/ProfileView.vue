<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PeopleYouMayKnow from '@/components/PeopleYouMayKnow.vue'
import Trends from '@/components/Trends.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import FeedItem from '../components/FeedItem.vue'
import { useToastStore } from '@/stores/toast'
import FeedForm from '../components/FeedForm.vue'

const toastStore = useToastStore()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const posts = ref([])
const user = ref({})
const can_send_friend_request = ref(null)
onMounted(() => {
  getData()
})
watch(
  () => route.params.id,
  () => {
    getData()
  },
  { deep: true }
)
const getData = () => {
  axios.get(`/api/posts/profile/${route.params.id}`).then((res) => {
    posts.value = res.data.posts
    user.value = res.data.user
    can_send_friend_request.value = res.data.can_send_friend_request
  })
}

const sendFriendRequest = () => {
  axios
    .post(`/api/friends/${route.params.id}/request/`)
    .then((res) => {
      if (res.data.message === 'request already sent') {
        toastStore.showToast(5000, 'The request has already been sent!', 'bg-red-300')
      } else {
        toastStore.showToast(5000, 'The request was sent!', 'bg-emerald-300')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const sendDirectMessage = () => {
  axios
    .get(`/api/chat/${route.params.id}/get_or_create/`)
    .then(() => {
      router.push('/chat')
    })
    .catch((err) => {
      console.log(err)
    })
}
const onFileChange = (e) => {
  const selectedImage = e.target.files[0]
  url.value = URL.createObjectURL(selectedImage)
}
const logout = () => {
  userStore.removeToken()
  router.push('/login')
}
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-1">
      <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
        <div class="flex items-center justify-center">
          <img :src="user.get_avatar" class="mb-6 rounded-full" />
        </div>
        <p>
          <strong>{{ user.name }}</strong>
        </p>
        <div class="mt-6 flex space-x-8 justify-around">
          <RouterLink :to="{ name: 'friends', params: { id: user.id } }">
            <p class="text-xs text-gray-500">{{ user.friends_count }} friends</p>
          </RouterLink>
          <p class="text-xs text-gray-500">{{ user.posts_count }} posts</p>
        </div>
        <div class="mt-6 grid gap-2">
          <button v-if="userStore.user.id !== user.id && can_send_friend_request" href="#" class="py-4 px-3 bg-purple-600 text-white rounded-lg text-xs" @click="sendFriendRequest">Send Friend Request</button>
          <button v-if="userStore.user.id !== user.id" href="#" class="py-4 px-3 bg-purple-600 text-white rounded-lg text-xs" @click="sendDirectMessage">Send Direct Message</button>
          <RouterLink v-if="userStore.user.id === user.id" :to="{ name: 'profileedit' }" class="py-4 px-3 bg-purple-600 text-white rounded-lg text-xs">Edit Profile</RouterLink>
          <button v-if="userStore.user.id === user.id" href="#" class="py-4 px-3 bg-red-600 text-white rounded-lg text-xs" @click="logout">Logout</button>
        </div>
      </div>
    </div>
    <div class="main-center col-span-2 space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg" v-if="userStore.user.id === user.id">
        <FeedForm :user="user" :posts="posts" />
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg" v-for="post in posts" :key="post.id">
        <FeedItem :post="post" />
      </div>
    </div>

    <div class="main-right col-span-1 space-y-4">
      <PeopleYouMayKnow />
      <Trends />
    </div>
  </div>
</template>
