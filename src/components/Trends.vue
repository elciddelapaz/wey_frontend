<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'
const trends = ref([])
onMounted(() => {
  getTrends()
})
const getTrends = () => {
  axios
    .get('/api/posts/trends/')
    .then((res) => (trends.value = res.data))
    .catch((err) => console.log(err))
}
</script>
<template>
  <div class="p-4 bg-white border border-gray-200 rounded-lg">
    <h3 class="mb-6 text-xl">Trends</h3>
    <div class="space-y-4">
      <div class="flex items-center justify-between" v-for="trend in trends" :key="trend.id">
        <p class="text-xs">
          <strong>#{{ trend.hashtag }}</strong>
          <span class="text-gray-500">{{ trend.occurences }} post</span>
        </p>
        <RouterLink :to="{ name: 'trendview', params: { id: trend.hashtag } }" class="py-2 px-3 bg-purple-600 text-white text-xs rounded-lg">Explore</RouterLink>
      </div>
    </div>
  </div>
</template>
