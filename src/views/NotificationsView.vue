<script setup>
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const data = reactive({ notifications: [] })
onMounted(() => {
  getNotifications()
})
const getNotifications = () => {
  axios
    .get('/api/notifications/')
    .then((res) => {
      data.notifications = res.data
    })
    .catch((err) => console.log(err))
}
const readNotification = async (notification) => {
  await axios
    .post(`/api/notifications/read/${notification.id}/`)
    .then(() => {
      if (notification.type_of_notification == 'postlike' || notification.type_of_notification == 'postcomment') {
        router.push({ name: 'post', params: { id: notification.post_id } })
      } else {
        router.push({ name: 'friends', params: { id: notification.created_for_id } })
      }
    })
    .catch((err) => console.log(err))
}
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-center col-span-3 space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg" v-for="notification in data.notifications" :key="notification.id" v-if="data.notifications.length">
        {{ notification.body }}
        <button @click="readNotification(notification)">View</button>
      </div>

      <div class="p-4 bg-white border border-gray-200 rounded-lg" v-else>You don't have any unread notifications!</div>
    </div>
  </div>
</template>
