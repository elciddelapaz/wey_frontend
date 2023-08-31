<script setup>
import axios from 'axios'
import { ref } from 'vue'
const props = defineProps({ user: Object, posts: Array })
const form = ref({ body: '' })
const is_private = ref(false)
const file = ref(null)
const url = ref(null)
const submit = () => {
  let formData = new FormData()
  formData.append('image', file.value.files[0])
  formData.append('body', form.value.body)
  formData.append('is_private', is_private.value)
  axios
    .post('/api/posts/create/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => {
      props.posts.data.unshift(res.data)
      form.value.body = ''
      url.value = ''
      is_private.value = false
      if (props.user) {
        props.user.posts_count += 1
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
<template>
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
