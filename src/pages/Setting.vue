<template>
    <div class="flex h-screen overflow-hidden">

        <!-- Sidebar -->
        <SidebarComponent :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

        <!-- Content area -->
        <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

            <!-- Site header -->
            <HeaderComponent :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

            <main class="grow">
                <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                    <!-- Page title -->
                    <div class="sm:flex sm:justify-between sm:items-center mb-8">
                        <div class="mb-4 sm:mb-0">
                            <h1 class="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                                Settings
                            </h1>
                        </div>
                    </div>

                    <!-- Cards -->
                    <div class="grid grid-cols-12 gap-6">

                        <!-- General Settings -->
                        <div class="col-span-12 lg:col-span-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                            <h2 class="text-xl font-bold mb-4">General Settings</h2>
                            <form>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Name</label>
                                    <input type="text"
                                        class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                        placeholder="Enter name" />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Week
                                        Start</label>
                                    <select
                                        class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                                        <option>Monday</option>
                                        <option>Tuesday</option>
                                        <option>Wednesday</option>
                                        <option>Thursday</option>
                                        <option>Friday</option>
                                        <option>Saturday</option>
                                        <option>Sunday</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="button"
                                        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Notification Settings -->
                        <div class="col-span-12 lg:col-span-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                            <h2 class="text-xl font-bold mb-4">Notification Settings</h2>
                            <form>
                                <div class="mb-4">
                                    <label class="flex items-center">
                                        <input type="checkbox"
                                            class="form-checkbox text-indigo-600 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" />
                                        <span class="ml-2 text-gray-700 dark:text-gray-300">Enable Email
                                            Notifications</span>
                                    </label>
                                </div>
                                <div class="mb-4">
                                    <label class="flex items-center">
                                        <input type="checkbox"
                                            class="form-checkbox text-indigo-600 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" />
                                        <span class="ml-2 text-gray-700 dark:text-gray-300">Enable SMS
                                            Notifications</span>
                                    </label>
                                </div>
                                <div>
                                    <button type="button"
                                        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </main>

            <BannerComponent />

        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import SidebarComponent from '../partials/Sidebar.vue';
import HeaderComponent from '../partials/Header.vue';
import BannerComponent from '../partials/Banner.vue';

export default {
    name: 'CustomSettingsPage',
    components: {
        SidebarComponent,
        HeaderComponent,
        BannerComponent,
    },
    setup() {
        const sidebarOpen = ref(false);

        return {
            sidebarOpen,
        };
    },
};
</script>

<style scoped></style>
