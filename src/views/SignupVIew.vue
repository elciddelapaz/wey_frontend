<script setup>
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { useToastStore } from '@/stores/toast'
import { reactive } from 'vue'

const toastStore = useToastStore()
const form = reactive({ email: '', name: '', password1: '', password2: '' })
const errors = reactive([])
const submit = () => {
  errors.splice(0)
  if (form.email === '') {
    errors.push('Your email is missing')
  }
  if (form.name === '') {
    errors.push('Your name is missing')
  }
  if (form.password1 === '') {
    errors.push('Your password is missing')
  }
  if (form.password1 !== form.password2) {
    errors.push('The password does not match!')
  }
  if (errors.length === 0) {
    axios
      .post('/api/signup/', form)
      .then((res) => {
        console.log(res)
        if (res.data.message === 'success') {
          toastStore.showToast(5000, 'The user is registered. Please activate it before logging in', 'bg-emerald-500')
          form.email = ''
          form.name = ''
          form.password1 = ''
          form.password2 = ''
        } else {
          const data = JSON.parse(res.data.message)
          for (const key in data) {
            for (let i = 0; i < data[key].length; i++) {
              errors.push(data[key][i].message)
            }
          }
          toastStore.showToast(5000, 'Something went wrong! Please try again', 'bg-red-300')
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
        <h1 class="mb-6 text-2xl">Sign up</h1>

        <p class="mb-6 text-gray-500">Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate.</p>

        <p class="font-bold">
          Already have an account?
          <RouterLink :to="{ name: 'login' }" class="underline">Click here</RouterLink>
          to log in!
        </p>
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
            <label>Password</label>
            <br />
            <input type="password" placeholder="Your password" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" v-model="form.password1" />
          </div>
          <div>
            <label>Repeat password</label>
            <br />
            <input type="password" placeholder="Repeat your password" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg" v-model="form.password2" />
          </div>
          <template v-if="errors.length > 0">
            <div class="bg-red-300 text-white rounded-lg p-6">
              <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
          </template>

          <div>
            <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
