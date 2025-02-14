<template>
  <div class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Recent Activity</h2>
    </header>
    <div class="p-3">
      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <div v-else>
        <!-- "Today" group -->
        <div>
          <header
            class="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Today
          </header>
          <ul class="my-1">
            <li v-for="activity in activities" :key="activity.EventID" class="flex px-2">
              <div class="w-9 h-9 rounded-full shrink-0 bg-violet-500 my-2 mr-3">
                <svg class="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                  <path
                    d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                </svg>
              </div>
              <div class="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                <div class="grow flex justify-between">
                  <div class="self-center">
                    <!-- Wrap the event name in router-link to navigate to the detail page -->
                    <router-link :to="`/event/${activity.EventID}`"
                      class="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white cursor-pointer">
                      {{ activity.EventName }}
                    </router-link>
                    <p class="text-gray-500 dark:text-gray-400">{{ activity.Description }}</p>
                  </div>
                  <div class="shrink-0 self-end ml-2">
                    <span class="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400">
                      {{ activity.Location }}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const loading = ref(true);
const activities = ref([]);

const fetchActivities = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/events'); // Thay URL API thực tế của bạn
    activities.value = response.data; // Gắn dữ liệu từ API vào state
  } catch (error) {
    console.error('Error fetching activities:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchActivities();
});
</script>
