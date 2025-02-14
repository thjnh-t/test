<template>
    <div class="container mx-auto px-4 py-6">
        <!-- Employee Title and Basic Information -->
        <header class="mb-6">
            <h1 class="text-3xl font-semibold text-gray-800 dark:text-white">
                {{ employeeDetails?.FirstName }} {{ employeeDetails?.LastName }}
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">
                Employee ID: {{ employeeDetails?.EmployeeID }}
            </p>
        </header>

        <!-- Employee Info Section -->
        <section class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <!-- Left: Personal Info -->
            <div>
                <h2 class="text-xl font-medium text-gray-800 dark:text-white mb-2">Personal Information</h2>
                <p class="text-gray-600 dark:text-gray-400"><strong>Gender:</strong> {{ employeeDetails?.Gender }}</p>
                <p class="text-gray-600 dark:text-gray-400"><strong>Date of Birth:</strong> {{
                    formatDate(employeeDetails?.DateOfBirth) }}</p>
                <p class="text-gray-600 dark:text-gray-400"><strong>Email:</strong> {{ employeeDetails?.Email }}</p>
                <p class="text-gray-600 dark:text-gray-400"><strong>Phone:</strong> {{ employeeDetails?.PhoneNumber }}
                </p>
            </div>

            <!-- Right: Address and Hire Info -->
            <div>
                <h2 class="text-xl font-medium text-gray-800 dark:text-white mb-2">Job Information</h2>
                <p class="text-gray-600 dark:text-gray-400"><strong>Address:</strong> {{ employeeDetails?.Address }}</p>
                <p class="text-gray-600 dark:text-gray-400"><strong>Hire Date:</strong> {{
                    formatDate(employeeDetails?.HireDate) }}</p>
                <p class="text-gray-600 dark:text-gray-400"><strong>Department:</strong> {{
                    employeeDetails?.DepartmentID }}</p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const employeeId = route.params.employeeId;  // Get employee ID from URL params
const employeeDetails = ref([]);

// Fetch employee details from API
const fetchEmployeeDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/employees/${employeeId}`);
        employeeDetails.value = response.data;
    } catch (error) {
        console.error('Error fetching employee details:', error);
    }
};

// Format date in YYYY-MM-DD format
const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-US');
};

// Fetch employee details when component is mounted
onMounted(() => {
    fetchEmployeeDetails();
});
</script>

<style scoped>
/* You can add custom styling here */
</style>
