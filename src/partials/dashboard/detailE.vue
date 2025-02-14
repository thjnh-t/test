<template>
    <div class="container mx-auto px-4 py-6">
        <!-- Event Title and Date -->
        <header class="mb-4">
            <h1 class="text-3xl font-semibold text-gray-800 dark:text-white">{{ eventDetails?.EventName }}</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ eventDetails?.EventDate }}</p>
        </header>

        <!-- Event Location -->
        <div class="mb-4">
            <span class="inline-block bg-violet-500 text-white px-4 py-2 rounded-full text-sm">
                {{ eventDetails?.Location }}
            </span>
        </div>

        <!-- Event Description -->
        <section class="mb-6">
            <h2 class="text-xl font-medium text-gray-800 dark:text-white mb-2">Event Description</h2>
            <p class="text-gray-600 dark:text-gray-400">{{ eventDetails?.Description }}</p>
        </section>

        <!-- Optionally, add other event-related details -->
        <section>
            <h2 class="text-xl font-medium text-gray-800 dark:text-white mb-2">Campaign</h2>
            <p class="text-gray-600 dark:text-gray-400">Campaign ID: {{ eventDetails?.CampaignID }}</p>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const eventId = route.params.eventId;
const eventDetails = ref(null);

const fetchEventDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/events/${eventId}`);
        eventDetails.value = response.data;
    } catch (error) {
        console.error('Error fetching event details:', error);
    }
};

onMounted(() => {
    fetchEventDetails();
});
</script>

<style scoped></style>
