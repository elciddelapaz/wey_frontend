<script setup>
import { RouterLink, useRoute } from 'vue-router'
import axios from 'axios'
import PeopleYouMayKnow from '@/components/PeopleYouMayKnow.vue'
import Trends from '@/components/Trends.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import FeedItem from '../components/FeedItem.vue'

const route = useRoute()
const userStore = useUserStore()
const friends = ref([])
const friendRequests = ref([])
const form = reactive({ body: '' })
const user = ref({})
onMounted(() => {
  getData()
})
const getData = () => {
  axios.get(`/api/friends/${route.params.id}/`).then((res) => {
    console.log(res.data)
    friendRequests.value = res.data.request
    friends.value = res.data.friends
    user.value = res.data.user
  })
}
const handleRequest = (status, id) => {
  axios
    .post(`/api/friends/${id}/${status}/`)
    .then((res) => {})
    .catch((err) => console.log(err))
}
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-1">
      <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
        <img src="https://i.pravatar.cc/300?img=70" class="mb-6 rounded-full" />
        <p>
          <strong>{{ user.name }}</strong>
        </p>
        <div class="mt-6 flex space-x-8 justify-around">
          <p class="text-xs text-gray-500">{{ user.friends_count }} friends</p>
          <p class="text-xs text-gray-500">{{ user.posts_count }} posts</p>
        </div>
        <div class="mt-6">
          <button href="#" class="inline-block py-4 px-3 bg-purple-600 text-white rounded-lg text-xs" @click="sendFriendRequest">Send Friend Request</button>
        </div>
      </div>
    </div>
    <div class="main-center col-span-2 space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg grid gap-4" v-if="friendRequests.length">
        <h2 class="mb-6 text-xl">Friend Request</h2>
        <div class="p-4 text-center bg-gray-100 rounded-lg" v-for="friendRequest in friendRequests" :key="friendRequest.id">
          <img src="https://i.pravatar.cc/100?img=70" class="mb-6 mx-auto rounded-full" />
          <p>
            <strong>
              {{ friendRequest.created_by.name }}
              <RouterLink :to="{ name: 'profile', params: { id: friendRequest.created_by.id } }">
                {{ friendRequest.name }}
              </RouterLink>
            </strong>
          </p>
          <div class="mt-6 flex space-x-4 justify-around">
            <p class="text-xs text-gray-500">{{ friendRequest.friends_count }} friends</p>
            <p class="text-xs text-gray-500">{{ friendRequest.posts_count }} posts</p>
          </div>
          <div class="mt-6 flex space-x-4 justify-around">
            <button href="#" class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg" @click="handleRequest('accepted', friendRequest.created_by.id)">Accept</button>
            <button href="#" class="inline-block py-4 px-6 bg-red-600 text-white rounded-lg" @click="handleRequest('rejected', friendRequest.created_by.id)">Reject</button>
          </div>
        </div>
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-2 gap-4" v-if="friends.length">
        <div class="p-4 text-center bg-gray-100 rounded-lg" v-for="friend in friends" :key="friend.id">
          <img src="https://i.pravatar.cc/100?img=70" class="mb-6 mx-auto rounded-full" />
          <p>
            <strong>
              <RouterLink :to="{ name: 'profile', params: { id: friend.id } }">
                {{ friend.name }}
              </RouterLink>
            </strong>
          </p>
          <div class="mt-6 flex space-x-4 justify-around">
            <p class="text-xs text-gray-500">{{ friend.friends_count }} friends</p>
            <p class="text-xs text-gray-500">{{ friend.posts_count }} posts</p>
          </div>
        </div>
      </div>
    </div>

    <div class="main-right col-span-1 space-y-4">
      <PeopleYouMayKnow />

      <Trends />
    </div>
  </div>
</template>
