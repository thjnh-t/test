<template>
    <div class="flex h-screen overflow-hidden">

        <!-- Sidebar -->
        <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

        <!-- Content area -->
        <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

            <!-- Site header -->
            <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

            <main class="grow">
                <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                    <!-- Dashboard actions -->
                    <div class="sm:flex sm:justify-between sm:items-center mb-8">

                        <!-- Left: Title -->
                        <div class="mb-4 sm:mb-0 flex items-center space-x-2">
                            <button @click="goBack">
                                <span> - Back</span>
                            </button>
                        </div>
                        <div class="mb-4 sm:mb-0">
                            <h1 class="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                                Alert</h1>
                        </div>



                    </div>

                    <!-- Cards -->
                    <div class="grid grid-cols-12 gap-6">
                        <detail-e style="width: 1000px;"></detail-e>
                    </div>

                </div>
            </main>

            <Banner />

        </div>

    </div>
</template>

<script>
import { ref } from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import FilterButton from '../components/DropdownFilter.vue'
import Datepicker from '../components/Datepicker.vue'
import DashboardCard12 from '../partials/dashboard/DashboardCard12.vue'
import DashboardCard13 from '../partials/dashboard/DashboardCard13.vue'
import Banner from '../partials/Banner.vue'
import DetailE from '../partials/dashboard/detailE.vue'

export default {
    name: 'Dashboard',
    components: {
        Sidebar,
        Header,
        FilterButton,
        Datepicker,
        DashboardCard12,
        DashboardCard13,
        DetailE,
        Banner,
    },
    setup() {

        const sidebarOpen = ref(false)
        const goBack = () => {
            // Logic for the "Back" button, you can replace this with router.push('/previous-page') or use window.history.back()
            window.history.back();
        }
        return {
            sidebarOpen, goBack,

        }
    }
}
</script>