<script setup>
import axios from 'axios'
import PeopleYouMayKnow from '@/components/PeopleYouMayKnow.vue'
import Trends from '@/components/Trends.vue'
import { onMounted, reactive } from 'vue'
import FeedItem from '../components/FeedItem.vue'
import FeedForm from '../components/FeedForm.vue'
const posts = reactive([])
onMounted(() => {
  getData()
})
const getData = () => {
  axios.get('/api/posts/').then((res) => {
    posts.data = res.data
  })
}
const deletePost = (id) => {
  posts.data = posts.data.filter((post) => post.id !== id)
}
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <FeedForm :posts="posts" />
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg" v-for="post in posts.data" :key="post.id">
        <FeedItem :post="post" @delete="deletePost" />
      </div>
    </div>

    <div class="main-right col-span-1 space-y-4">
      <PeopleYouMayKnow />

      <Trends />
    </div>
  </div>
</template>
