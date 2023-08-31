<script setup>
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { RouterLink } from 'vue-router'
const users = reactive({ data: [] })

onMounted(() => {
  axios
    .get('/api/friends/suggested/')
    .then((res) => {
      users.data = res.data
      // console.log(res.data)
    })
    .catch((err) => console.log(err))
})
</script>
<template>
  <div class="p-4 bg-white border border-gray-200 rounded-lg">
    <h3 class="mb-6 text-xl">People you may know</h3>
    <div class="space-y-4">
      <div class="flex items-center justify-between" v-for="user in users.data" :key="user.id">
        <div class="flex items-center space-x-2">
          <img :src="user.get_avatar" class="w-[40px] rounded-full" />
          <p class="text-xs">
            <strong>{{ user.name }}</strong>
          </p>
        </div>
        <RouterLink :to="{ name: 'profile', params: { id: user.id } }" class="py-2 px-3 bg-purple-600 text-white text-xs rounded-lg">View Profile</RouterLink>
      </div>
    </div>
  </div>
</template>
