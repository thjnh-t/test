<template>
  <div class="grow flex flex-col justify-center">
    <div>
      <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
    <div class="px-5 pt-2 pb-6">
      <ul ref="legend" class="flex flex-wrap justify-center -m-1"></ul>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useDark } from '@vueuse/core'
import { chartColors } from './ChartjsConfig'
import { tailwindConfig } from '../utils/Utils'
import axios from 'axios'

import {
  Chart, DoughnutController, ArcElement, TimeScale, Tooltip,
} from 'chart.js'
import 'chartjs-adapter-moment'

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip)

export default {
  name: 'DoughnutChart',
  setup() {
    const canvas = ref(null)
    const legend = ref(null)
    let chart = null
    const darkMode = useDark()
    const { tooltipTitleColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors

    // Dữ liệu biểu đồ sẽ được cập nhật từ API
    const chartData = ref({
      labels: ['Male', 'Female', 'Other'],
      datasets: [
        {
          label: 'Gender',
          data: [0, 0, 0], // Placeholder, sẽ cập nhật sau khi lấy dữ liệu từ API
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
    })

    const width = ref(389)
    const height = ref(260)

    onMounted(async () => {
      try {
        // Lấy dữ liệu từ API
        const employeeResponse = await axios.get("http://localhost:3000/api/employees")
        const employeeData = employeeResponse.data

        // Đếm số lượng giới tính
        const counts = employeeData.reduce(
          (counts, employee) => {
            if (employee.Gender === 'Male') {
              counts.male++
            } else if (employee.Gender === 'Female') {
              counts.female++
            } else {
              counts.other++
            }
            return counts
          },
          { male: 0, female: 0, other: 0 }
        )

        // Cập nhật dữ liệu vào chartData
        chartData.value.datasets[0].data = [
          counts.male,
          counts.female,
          counts.other,
        ]

        // Tạo biểu đồ mới hoặc cập nhật biểu đồ hiện tại
        if (chart) {
          chart.data = chartData.value
          chart.update()
        }

      } catch (error) {
        console.error("Error fetching data:", error)
      }
    })

    onMounted(() => {
      const ctx = canvas.value
      chart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData.value,
        options: {
          cutout: '80%',
          layout: {
            padding: 24,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              titleColor: darkMode.value ? tooltipTitleColor.dark : tooltipTitleColor.light,
              bodyColor: darkMode.value ? tooltipBodyColor.dark : tooltipBodyColor.light,
              backgroundColor: darkMode.value ? tooltipBgColor.dark : tooltipBgColor.light,
              borderColor: darkMode.value ? tooltipBorderColor.dark : tooltipBorderColor.light,
            },
          },
          interaction: {
            intersect: false,
            mode: 'nearest',
          },
          animation: {
            duration: 500,
          },
          maintainAspectRatio: false,
          resizeDelay: 200,
        },
        plugins: [{
          id: 'htmlLegend',
          afterUpdate(c, args, options) {
            const ul = legend.value
            if (!ul) return
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove()
            }
            // Reuse the built-in legendItems generator
            const items = c.options.plugins.legend.labels.generateLabels(c)
            items.forEach((item) => {
              const li = document.createElement('li')
              li.style.margin = tailwindConfig().theme.margin[1]
              // Button element
              const button = document.createElement('button')
              button.classList.add('btn-xs', 'bg-white', 'dark:bg-gray-700', 'text-gray-500', 'dark:text-gray-400', 'shadow-sm', 'shadow-black/[0.08]', 'rounded-full')
              button.style.opacity = item.hidden ? '.3' : ''
              button.onclick = () => {
                c.toggleDataVisibility(item.index, !item.index)
                c.update()
              }
              // Color box
              const box = document.createElement('span')
              box.style.display = 'block'
              box.style.width = tailwindConfig().theme.width[2]
              box.style.height = tailwindConfig().theme.height[2]
              box.style.backgroundColor = item.fillStyle
              box.style.borderRadius = tailwindConfig().theme.borderRadius.sm
              box.style.marginRight = tailwindConfig().theme.margin[1]
              box.style.pointerEvents = 'none'
              // Label
              const label = document.createElement('span')
              label.style.display = 'flex'
              label.style.alignItems = 'center'
              const labelText = document.createTextNode(item.text)
              label.appendChild(labelText)
              li.appendChild(button)
              button.appendChild(box)
              button.appendChild(label)
              ul.appendChild(li)
            })
          },
        }],
      })
    })

    // Khi dữ liệu thay đổi, cập nhật lại chart
    watch(chartData, (newData) => {
      if (chart) {
        chart.data = newData
        chart.update()
      }
    }, { immediate: true })

    onUnmounted(() => chart.destroy())

    return {
      canvas,
      legend,
      width,
      height,
      chartData,
    }
  }
}
</script>
