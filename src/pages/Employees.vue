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
                        <div class="mb-4 sm:mb-0">
                            <h1 class="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                                Employees</h1>
                        </div>

                        <!-- Right: Actions -->


                    </div>

                    <!-- Cards -->
                    <div class="grid grid-cols-20 gap-6">
                        <DashboardCard10 />
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
import DashboardCard10 from '../partials/dashboard/DashboardCard10.vue'
import Banner from '../partials/Banner.vue'

export default {
    name: 'Dashboard',
    components: {
        Sidebar,
        Header,
        FilterButton,
        Datepicker,
        DashboardCard10,
        Banner,
    },
    setup() {

        const sidebarOpen = ref(false)

        return {
            sidebarOpen,
        }
    }
}
</script>