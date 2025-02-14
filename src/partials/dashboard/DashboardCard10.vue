    <template>
      <div class="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 class="font-semibold text-gray-800 dark:text-gray-100">Employees</h2>
        </header>
        <div class="p-3">

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="table-auto w-full">
              <!-- Table header -->
              <thead
                class="text-xs font-semibold uppercase dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                <tr>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Name</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Email</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-left">Total Earning</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class="font-semibold text-center">Country</div>
                  </th>
                </tr>
              </thead>
              <!-- Table body -->
              <tbody class="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                <tr v-for="employee in employees" :key="employee.EmployeeID">
                  <td class="p-2 whitespace-nowrap">
                    <div class="flex items-center">
                      <router-link :to="`/employee/${employee.EmployeeID}`" class="cursor-pointer">
                        <div class="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                          <img class="rounded-full" :src="customers.image" width="40" height="40" alt="employee name" />
                        </div>
                        <div class="font-medium text-gray-800 dark:text-gray-100">{{ employee.FirstName }} {{
                          employee.LastName }}</div>
                      </router-link>
                    </div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left">{{ employee.Email }}</div>
                  </td>
                  <!-- Hiển thị lương (salary) từ bảng Payroll -->
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-left font-medium text-green-500">{{ currency(employee.salary) }}</div>
                  </td>
                  <td class="p-2 whitespace-nowrap">
                    <div class="text-lg text-center" style="font-size: 14px;">{{ employee.Address }}</div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>
      </div>
    </template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

import Image01 from "../../images/user-36-05.jpg";

export default {
  name: "DashboardCard10",
  setup() {
    const customers = ref({ image: Image01 });
    const employees = ref([]);

    onMounted(async () => {
      try {
        // Lấy dữ liệu từ bảng Employees
        const employeeResponse = await axios.get(
          "http://localhost:3000/api/employees"
        );
        const employeeData = employeeResponse.data;

        // Lấy dữ liệu từ bảng Payroll
        const payrollResponse = await axios.get(
          "http://localhost:3000/api/payroll"
        );
        const payrollData = payrollResponse.data;

        // Kết hợp dữ liệu từ cả hai bảng dựa trên EmployeeID (không phải _id)
        employees.value = employeeData.map((employee) => {
          const payroll = payrollData.find(
            (pay) => pay.EmployeeID === employee.EmployeeID
          );
          return {
            ...employee,
            salary: payroll ? payroll.NetSalary : 0, // Nếu không có dữ liệu Payroll, đặt lương là 0
          };
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    const currency = (value) => {
      return `$${value.toFixed(2)}`;
    };

    return {
      customers,
      employees,
      currency,
    };
  },
};
</script>
