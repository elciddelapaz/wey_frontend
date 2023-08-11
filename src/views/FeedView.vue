<script setup>
import { RouterLink } from "vue-router";
import axios from "axios";
import PeopleYouMayKnow from "@/components/PeopleYouMayKnow.vue";
import Trends from "@/components/Trends.vue";
import { onMounted, reactive } from "vue";
import FeedItem from "../components/FeedItem.vue";
const posts = reactive([]);
const form = reactive({ body: "" });
onMounted(() => {
  axios.get("/api/posts/").then((res) => {
    posts.data = res.data;
  });
});

const submit = () => {
  axios
    .post("/api/posts/create/", form)
    .then((res) => {
      posts.data.unshift(res.data);
      form.body = "";
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <form method="post" @submit.prevent="submit">
          <div class="p-4">
            <textarea
              v-model="form.body"
              class="p-4 w-full bg-gray-100 rounded-lg"
              placeholder="What are you thinking about?"
            />
          </div>
          <div class="p-4 border-t border-gray-100 flex justify-between">
            <button
              href="#"
              class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg"
            >
              Attach image
            </button>
            <button
              href="#"
              class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg"
            >
              Post
            </button>
          </div>
        </form>
      </div>
      <div
        class="p-4 bg-white border border-gray-200 rounded-lg"
        v-for="post in posts.data"
        :key="post.id"
      >
        <FeedItem :post="post" />
      </div>
    </div>

    <div class="main-right col-span-1 space-y-4">
      <PeopleYouMayKnow />

      <Trends />
    </div>
  </div>
</template>
