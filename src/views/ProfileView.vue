<script setup>
import { RouterLink, useRoute } from "vue-router";
import axios from "axios";
import PeopleYouMayKnow from "@/components/PeopleYouMayKnow.vue";
import Trends from "@/components/Trends.vue";
import { onMounted, onUpdated, reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import FeedItem from "../components/FeedItem.vue";
const route = useRoute();
const userStore = useUserStore();
const posts = reactive([]);
const form = reactive({ body: "" });
const user = ref({});
onMounted(async () => {
  await axios.get(`/api/posts/profile/${route.params.id}`).then((res) => {
    posts.data = res.data.posts;
    user.value = res.data.user;
  });
});
// onUpdated(() => {

// })
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
    <div class="main-left col-span-1">
      <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
        <img src="https://i.pravatar.cc/300?img=70" class="mb-6 rounded-full" />
        <p>
          <strong>{{ user.name }}</strong>
        </p>
        <div class="mt-6 flex space-x-8 justify-around">
          <p class="text-xs text-gray-500">182 friends</p>
          <p class="text-xs text-gray-500">120 posts</p>
        </div>
      </div>
    </div>
    <div class="main-center col-span-2 space-y-4">
      <div
        class="p-4 bg-white border border-gray-200 rounded-lg"
        v-if="userStore.user.id === user.id"
      >
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
