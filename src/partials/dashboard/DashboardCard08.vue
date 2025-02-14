<template>
  <div class="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Sales Over Time (all stores)</h2>
    </header>
    <!-- Chart built with Chart.js 3 -->
    <LineChart v-if="isDataLoaded" :data="chartData" width="595" height="248" :totalAmount="totalVC" />
    <div v-if="!isDataLoaded" class="flex justify-center items-center p-4">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { chartAreaGradient } from '../../charts/ChartjsConfig'
import LineChart from '../../charts/LineChart02.vue'

// Import utilities
import { tailwindConfig } from '../../utils/Utils'

export default {
  name: 'DashboardCard08',
  components: {
    LineChart,
  },
  setup() {
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Current',
          data: [],
          borderColor: tailwindConfig().theme.colors.violet[500],
          fill: false,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
          tension: 0.2,
        },
        {
          label: 'Previous',
          data: [],
          borderColor: tailwindConfig().theme.colors.sky[500],
          fill: false,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.sky[500],
          clip: 20,
          tension: 0.2,
        },
        {
          label: 'Average',
          data: [],
          borderColor: tailwindConfig().theme.colors.green[500],
          fill: false,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.green[500],
          clip: 20,
          tension: 0.2,
        },
      ],
    })

    const isDataLoaded = ref(false) // Flag to track if data is loaded
    const totalVC = ref(0)  // Để lưu trữ tổng BenefitValue của VC

    const fetchData = async () => {
      try {
        // Gọi API để lấy dữ liệu lợi ích
        const response = await axios.get('http://localhost:3000/api/benefits')

        // Giả sử API trả về dữ liệu với cấu trúc như sau:
        const data = response.data

        // Phân loại dữ liệu theo BenefitType và cập nhật vào datasets
        const currentData = data.filter(item => item.BenefitType === 'BT').map(item => item.BenefitValue)
        const previousData = data.filter(item => item.BenefitType === 'VC').map(item => item.BenefitValue)
        const averageData = currentData.length > 0 ? currentData.map(value => value / 2) : []

        // Cập nhật lại dữ liệu vào chartData
        chartData.value.datasets[0].data = currentData
        chartData.value.datasets[1].data = previousData
        chartData.value.datasets[2].data = averageData
        chartData.value.labels = [
          '12-01-2022', '01-01-2023', '02-01-2023',
          '03-01-2023', '04-01-2023', '05-01-2023',
          '06-01-2023', '07-01-2023', '08-01-2023',
          '09-01-2023', '10-01-2023', '11-01-2023',
          '12-01-2023', '01-01-2024', '02-01-2024',
          '03-01-2024', '04-01-2024', '05-01-2024',
          '06-01-2024', '07-01-2024', '08-01-2024',
          '09-01-2024', '10-01-2024', '11-01-2024',
          '12-01-2024', '01-01-2025',
        ]

        // Tính tổng VC và gán vào totalVC
        totalVC.value = previousData.reduce((sum, item) => sum + item, 0)

        // Set the flag to true after data is loaded
        isDataLoaded.value = true
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    // Gọi hàm fetchData khi component được mount
    onMounted(() => {
      fetchData()
    })

    return {
      chartData,
      isDataLoaded,
      totalVC,
    }
  }
}
</script>
