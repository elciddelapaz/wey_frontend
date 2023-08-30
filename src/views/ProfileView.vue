<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PeopleYouMayKnow from '@/components/PeopleYouMayKnow.vue'
import Trends from '@/components/Trends.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import FeedItem from '../components/FeedItem.vue'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const is_private = ref(false)
const posts = ref([])
const form = ref({ body: '' })
const user = ref({})
const can_send_friend_request = ref(null)
const file = ref(null)
const url = ref(null)
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
const submit = () => {
  let formData = new FormData()
  formData.append('image', file.value.files[0])
  formData.append('body', form.value.body)
  formData.append('is_private', is_private.value)
  axios
    .post('/api/posts/create/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => {
      posts.value.unshift(res.data)
      form.value.body = ''
      url.value = ''
      is_private.value = false
      user.value.posts_count += 1
    })
    .catch((err) => {
      console.log(err)
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
        <form method="post" @submit.prevent="submit">
          <div class="p-4">
            <textarea v-model="form.body" class="p-4 w-full bg-gray-100 rounded-lg" placeholder="What are you thinking about?" />
            <label>
              <input type="checkbox" v-model="is_private" />
              Private
            </label>
            <div id="preview" v-if="url">
              <img :src="url" class="w-[100px] mt-3 rounded-xl" />
            </div>
          </div>
          <div class="p-4 border-t border-gray-100 flex justify-between">
            <label class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg">
              <input type="file" ref="file" @change="onFileChange" />
              Attach image
            </label>
            <button href="#" class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">Post</button>
          </div>
        </form>
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
<style scoped>
input[type='file'] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
