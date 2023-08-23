<script setup>
import axios from 'axios'
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toastStore = useToastStore()
const userStore = useUserStore()
const form = reactive({ email: userStore.user.email, name: userStore.user.name })
const errors = reactive([])
const file = ref(null)
const submit = () => {
  errors.splice(0)
  if (form.email === '') {
    errors.push('Your email is missing')
  }
  if (form.name === '') {
    errors.push('Your name is missing')
  }
  if (errors.length === 0) {
    let formData = new FormData()
    formData.append('avatar', file.value.files[0])
    formData.append('name', form.name)
    formData.append('email', form.email)
    axios
      .post('/api/editprofile/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        if (res.data.message === 'success') {
          toastStore.showToast(5000, 'The information was saved', 'bg-emerald-500')
          userStore.setUserInfo({
            id: userStore.user.id,
            name: form.name,
            email: form.email,
            avatar: res.data.user.get_avatar,
          })
          router.back()
        } else {
          toastStore.showToast(5000, `${res.data.message} Please try again`, 'bg-red-300')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
    <div class="main-left">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <h1 class="mb-6 text-2xl">Edit Profile</h1>

        <p class="mb-6 text-gray-500">Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate.</p>
      </div>
    </div>

    <div class="main-right">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <form class="space-y-6" @submit.prevent="submit">
          <div>
            <label>Name</label>
            <br />
            <input type="text" placeholder="Your full name" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" v-model="form.name" />
          </div>

          <div>
            <label>E-mail</label>
            <br />
            <input type="email" placeholder="Your e-mail address" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" v-model="form.email" />
          </div>
          <div>
            <label>Avatar</label>
            <br />
            <input type="file" ref="file" />
          </div>
          <template v-if="errors.length > 0">
            <div class="bg-red-300 text-white rounded-lg p-6">
              <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
          </template>

          <div>
            <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
