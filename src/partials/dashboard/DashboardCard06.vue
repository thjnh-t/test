<template>
  <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Gender</h2>
    </header>
    <!-- Chart built with Chart.js 3 -->
    <DoughnutChart :data="chartData" width="389" height="260" />
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import DoughnutChart from '../../charts/DoughnutChart.vue'
import axios from 'axios'

// Import utilities
import { tailwindConfig } from '../../utils/Utils'

export default {
  name: 'DashboardCard06',
  components: {
    DoughnutChart,
  },
  setup() {
    const chartData = reactive({
      labels: ['Male', 'Female', 'Other'],
      datasets: [
        {
          label: 'Gender',
          data: [0, 0, 0], // Placeholder, will be updated after fetching data
          backgroundColor: [
            tailwindConfig().theme.colors.violet[500],
            tailwindConfig().theme.colors.sky[500],
            tailwindConfig().theme.colors.violet[800],
          ],
          hoverBackgroundColor: [
            tailwindConfig().theme.colors.violet[600],
            tailwindConfig().theme.colors.sky[600],
            tailwindConfig().theme.colors.violet[900],
          ],
          borderWidth: 0,
        },
      ],
    });

    onMounted(async () => {
      try {
        // Fetch dữ liệu từ bảng Employees
        const employeeResponse = await axios.get(
          "http://localhost:3000/api/employees"
        );
        const employeeData = employeeResponse.data;

        // Đếm số lượng giới tính
        const counts = employeeData.reduce(
          (counts, employee) => {
            if (employee.Gender === 'Male') {
              counts.male++;
            } else if (employee.Gender === 'Female') {
              counts.female++;
            } else {
              counts.other++;
            }
            return counts;
          },
          { male: 0, female: 0, other: 0 }
        );

        // Cập nhật trực tiếp chartData
        chartData.datasets[0].data = [
          counts.male,
          counts.female,
          counts.other,
        ];


      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {

      }
    });

    return {
      chartData,
    };
  }
}
</script>
