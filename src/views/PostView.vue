<script setup>
import { RouterLink, useRoute } from 'vue-router'
import axios from 'axios'
import PeopleYouMayKnow from '@/components/PeopleYouMayKnow.vue'
import Trends from '@/components/Trends.vue'
import { onMounted, reactive, ref } from 'vue'
import FeedItem from '@/components/FeedItem.vue'
import CommentItem from '@/components/CommentItem.vue'
const post = ref({ id: null, comments: [] })
const route = useRoute()
const form = reactive({ body: '' })
onMounted(() => {
  axios.get(`/api/posts/${route.params.id}/`).then((res) => {
    post.value = res.data.post
  })
})

const submit = () => {
  axios
    .post(`/api/posts/${route.params.id}/comment/`, form)
    .then((res) => {
      form.body = ''
      post.value['comments'].push(res.data)
      post.value.comments_count += 1
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg" v-if="post.id">
        <FeedItem :post="post" />
      </div>
      <div class="p-4 ml-6 bg-white border border-gray-200 rounded-lg" v-for="comment in post.comments" :key="comment.id">
        <CommentItem :comment="comment" />
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <form method="post" @submit.prevent="submit">
          <div class="p-4">
            <textarea v-model="form.body" class="p-4 w-full bg-gray-100 rounded-lg" placeholder="Add comment" />
          </div>
          <div class="p-4 border-t border-gray-100">
            <button href="#" class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">Comment</button>
          </div>
        </form>
      </div>
    </div>

    <div class="main-right col-span-1 space-y-4">
      <PeopleYouMayKnow />
      <Trends />
    </div>
  </div>
</template>
