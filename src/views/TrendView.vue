<script setup>
import { RouterLink, useRoute } from 'vue-router'
import axios from 'axios'
import PeopleYouMayKnow from '@/components/PeopleYouMayKnow.vue'
import Trends from '@/components/Trends.vue'
import { onMounted, reactive, watch } from 'vue'
import FeedItem from '../components/FeedItem.vue'
const route = useRoute()
const posts = reactive([])
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
  axios
    .get(`/api/posts/?trend=${route.params.id}`)
    .then((res) => {
      posts.data = res.data
    })
    .catch((err) => console.log(err))
}
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <h2 class="text-xl">#{{ $route.params.id }}</h2>
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg" v-for="post in posts.data" :key="post.id">
        <FeedItem :post="post" />
      </div>
    </div>

    <div class="main-right col-span-1 space-y-4">
      <PeopleYouMayKnow />

      <Trends />
    </div>
  </div>
</template>
