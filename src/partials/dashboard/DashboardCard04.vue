<template>
  <div class="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Quarterly Sale Development</h2>
    </header>
    <!-- Chart built with Chart.js 3 -->
    <BarChart v-if="isDataLoaded" :data="chartData" width="595" height="248" :totalBT="totalBT" :totalVC="totalVC" />
    <div v-if="!isDataLoaded" class="flex justify-center items-center p-4">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BarChart from '../../charts/BarChart01.vue'

// Import utilities
import { tailwindConfig } from '../../utils/Utils'

export default {
  name: 'DashboardCard03',
  components: {
    BarChart,
  },
  setup() {
    const chartData = ref({
      labels: [
        '12-01-2022', '01-01-2023', '02-01-2023',
        '03-01-2023', '04-01-2023', '05-01-2023',
      ],
      datasets: [
        // Direct dataset (BT)
        {
          label: 'Normal',
          data: [],
          backgroundColor: tailwindConfig().theme.colors.sky[500],
          hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
          barPercentage: 0.7,
          categoryPercentage: 0.7,
          borderRadius: 4,
        },
        // Indirect dataset (VC)
        {
          label: 'Other',
          data: [],
          backgroundColor: tailwindConfig().theme.colors.violet[500],
          hoverBackgroundColor: tailwindConfig().theme.colors.violet[600],
          barPercentage: 0.7,
          categoryPercentage: 0.7,
          borderRadius: 4,
        },
      ],
    })

    const totalBT = ref(0) // Tổng BenefitValue của BT
    const totalVC = ref(0) // Tổng BenefitValue của VC
    const isDataLoaded = ref(false) // Flag để kiểm tra khi dữ liệu đã tải xong

    const fetchData = async () => {
      try {
        // Gọi API để lấy dữ liệu lợi ích
        const response = await axios.get('http://localhost:3000/api/benefits')
        const data = response.data

        // Phân loại dữ liệu theo BenefitType và cập nhật vào datasets
        const btData = data.filter(item => item.BenefitType === 'BT').map(item => item.BenefitValue)
        const vcData = data.filter(item => item.BenefitType === 'VC').map(item => item.BenefitValue)

        // Cập nhật dữ liệu vào chartData
        chartData.value.datasets[0].data = btData
        chartData.value.datasets[1].data = vcData

        // Tính tổng BenefitValue cho BT và VC
        totalBT.value = btData.reduce((sum, item) => sum + item, 0)
        totalVC.value = vcData.reduce((sum, item) => sum + item, 0)

        // Đánh dấu dữ liệu đã được tải
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
      totalBT,
      totalVC,
      isDataLoaded,
    }
  }
}
</script>
