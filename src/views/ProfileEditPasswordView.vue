<script setup>
import axios from 'axios'
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const toastStore = useToastStore()
const userStore = useUserStore()
const form = reactive({ old_password: '', new_password1: '', new_password2: '' })
const errors = reactive([])
const file = ref(null)
const submit = () => {
  errors.splice(0)
  if (form.new_password1 !== form.new_password2) {
    errors.push('The password does not match!')
  }
  if (errors.length === 0) {
    let formData = new FormData()
    formData.append('old_password', form.old_password)
    formData.append('new_password1', form.new_password1)
    formData.append('new_password2', form.new_password2)
    axios
      .post('/api/editpassword/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        if (res.data.message === 'success') {
          toastStore.showToast(5000, 'The information was saved', 'bg-emerald-500')
          router.push(`/profile/${userStore.user.id}`)
        } else {
          const data = JSON.parse(res.data.message)
          for (const key in data) {
            for (let i = 0; i < data[key].length; i++) {
              errors.push(data[key][i].message)
            }
          }
          toastStore.showToast(5000, `Something went wrong! Please try again`, 'bg-red-300')
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
        <h1 class="mb-6 text-2xl">Edit Password</h1>

        <p class="mb-6 text-gray-500">Here you can change your password</p>
      </div>
    </div>

    <div class="main-right">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <form class="space-y-6" @submit.prevent="submit">
          <div>
            <label>Old password</label>
            <br />
            <input type="password" placeholder="Type here" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" v-model="form.old_password" />
          </div>
          <div>
            <label>New password</label>
            <br />
            <input type="password" placeholder="Type here" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" v-model="form.new_password1" />
          </div>
          <div>
            <label>Confirm password</label>
            <br />
            <input type="password" placeholder="Type here" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" v-model="form.new_password2" />
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
