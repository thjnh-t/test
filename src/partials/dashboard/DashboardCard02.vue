<template>
  <div v-if="remove"
    class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <div class="px-5 pt-5">
      <header class="flex justify-between items-start mb-2">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Advanced</h2>
        <EditMenu align="right" class="relative inline-flex">
          <li>
            <a class="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
              @click="remove = !remove">Remove</a>
          </li>
        </EditMenu>
      </header>
      <div class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div>
      <div class="flex items-start">
        <div class="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">${{ averageBenefits }}</div>
        <div class="text-sm font-medium text-red-700 px-1.5 bg-red-500/20 rounded-full">-{{ random.toFixed(2) }}%</div>
      </div>
    </div>
    <!-- Chart built with Chart.js 3 -->
    <div class="grow max-sm:max-h-[128px] xl:max-h-[128px]">
      <!-- Change the height attribute to adjust the chart height -->
      <LineChart v-if="chartData.datasets[0].data.length" :data="chartData" width="389" height="128" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import LineChart from '../../charts/LineChart01.vue';
import EditMenu from '../../components/DropdownEditMenu.vue';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

export default {
  name: 'DashboardCard02',
  components: {
    LineChart,
    EditMenu,
  },
  setup() {
    const remove = ref(true);
    const benefits = ref([]); // Chứa danh sách dữ liệu Benefit
    const random = ref(0)
    // Lấy dữ liệu từ API
    const fetchBenefits = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/benefits'); // Thay URL API thực tế
        benefits.value = response.data;

        // Lấy dữ liệu gốc cho Indigo line
        const benefitValues = response.data.map(item => item.BenefitValue || 0);
        chartData.value.datasets[0].data = benefitValues;

        // Tăng dữ liệu 14% cho Gray line
        // const increasedValues = benefitValues.map(value => value * 1.14);
        const reducedValues = benefitValues.map(value => {
          const randomFactor = Math.random() * (1.49 - 1) + 1; // Tạo ngẫu nhiên từ 1 đến 1.49
          random.value = randomFactor.toFixed(2) * 10
          return value * randomFactor; // Giảm từ 1% đến 49%
        });
        chartData.value.datasets[1].data = reducedValues;
      } catch (error) {
        console.error('Error fetching benefits:', error);
      }
    };

    const chartData = ref({
      labels: [
        '12-01-2022', '01-01-2023', '02-01-2023',
        '03-01-2023', '04-01-2023', '05-01-2023',
        '06-01-2023', '07-01-2023', '08-01-2023',
        '09-01-2023', '10-01-2023', '11-01-2023',
        '12-01-2023', '01-01-2024', '02-01-2024',
        '03-01-2024', '04-01-2024', '05-01-2024',
        '06-01-2024', '07-01-2024', '08-01-2024',
        '09-01-2024', '10-01-2024', '11-01-2024',
        '12-01-2024', '01-01-2025',
      ],
      datasets: [
        // Indigo line
        {
          data: [], // Dữ liệu từ API
          fill: true,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            return chartAreaGradient(ctx, chartArea, [
              { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0)` },
              { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)` },
            ]);
          },
          borderColor: tailwindConfig().theme.colors.violet[500],
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.2,
        },
        // Gray line
        {
          data: [], // Dữ liệu tăng 14%
          borderColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.2,
        },
      ],
    });

    // Tính giá trị trung bình BenefitValue
    const averageBenefits = computed(() => {
      if (benefits.value.length === 0) return 0;
      const sum = benefits.value.reduce((sum, benefit) => sum + (benefit.BenefitValue || 0), 0);
      return (sum / benefits.value.length).toFixed(2);
    });

    // Gọi API khi component được mount
    onMounted(() => {
      fetchBenefits();
    });

    return {
      chartData,
      remove,
      benefits,
      averageBenefits,
      random
    };
  },
};
</script>
