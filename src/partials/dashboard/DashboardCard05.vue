<template>
  <div class="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
    <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">Benefits of each employee</h2>
    </header>
    <!-- Chart built with Chart.js 3 -->
    <RealtimeChart :data="chartData" width="595" height="248" />
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import axios from 'axios';
import Tooltip from '../../components/Tooltip.vue';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import RealtimeChart from '../../charts/RealtimeChart.vue';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

export default {
  name: 'DashboardCard05',
  components: {
    Tooltip,
    RealtimeChart,
  },
  setup() {
    const counter = ref(0);
    const range = ref(35);

    const sampleData = ref([]); // Dữ liệu từ API
    const slicedData = ref([]);
    const slicedLabels = ref([]);

    const fetchBenefitsData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/benefits'); // URL API
        sampleData.value = response.data.map((item) => item.BenefitValue); // Map dữ liệu
        const now = new Date();
        const dates = sampleData.value.map((_, i) => new Date(now - i * 2000));
        slicedData.value = sampleData.value.slice(0, range.value);
        slicedLabels.value = dates.slice(0, range.value).reverse();
      } catch (error) {
        console.error('Error fetching benefits data:', error);
      }
    };

    // Fetch data on mount
    onMounted(async () => {
      await fetchBenefitsData();
      interval.value = setInterval(() => {
        counter.value++;
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(interval.value);
    });

    // Fake update every 2 seconds
    const interval = ref(null);
    watch(counter, () => {
      range.value++;
      if (range.value >= sampleData.value.length) {
        range.value = 0;
      }
      slicedData.value.shift();
      slicedData.value.push(sampleData.value[range.value]);
      slicedLabels.value.shift();
      slicedLabels.value.push(new Date());
    });

    const chartData = computed(() => {
      return {
        labels: slicedLabels.value,
        datasets: [
          {
            data: [...slicedData.value],
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
            pointHoverRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
            clip: 20,
            tension: 0.2,
          },
        ],
      };
    });

    return {
      counter,
      range,
      slicedData,
      slicedLabels,
      interval,
      chartData,
    };
  },
};
</script>
