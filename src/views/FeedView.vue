<script setup>
import { RouterLink } from "vue-router";
import axios from "axios";
import PeopleYouMayKnow from "@/components/PeopleYouMayKnow.vue";
import Trends from "@/components/Trends.vue";
import { onMounted, reactive } from "vue";
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
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <img
              src="https://i.pravatar.cc/300?img=70"
              class="w-[40px] rounded-full"
            />
            <p>
              <strong>{{ post.created_by.name }}</strong>
            </p>
          </div>
          <p class="text-gray-600">{{ post.created_at_formatted }} ago</p>
        </div>
        <p>{{ post.body }}</p>
        <div class="my-6 flex justify-between">
          <div class="flex space-x-6 items-center">
            <div class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                ></path>
              </svg>

              <span class="text-gray-500 text-xs"> 18 likes</span>
            </div>

            <div class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                ></path>
              </svg>

              <!-- <RouterLink :to="{ name: 'postview' }" class="text-gray-500 text-xs"
              >comments</RouterLink
            > -->
            </div>

            <div class="flex items-center space-x-2 text-gray-500 text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>

              <span>Is private</span>
            </div>
          </div>

          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                ></path>
              </svg>
            </div>
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
