import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./pages/Dashboard.vue";
import Vacation from "./pages/Vacation.vue";
import Benifits from "./pages/benifits.vue";
import Employees from "./pages/Employees.vue";
import Alert from "./pages/Alert.vue";
import Setting from "./pages/Setting.vue";
import EventDetailPage from "./pages/EventDetailPage.vue";
import SignIn from "./pages/SignIn.vue";
import DetailEmployee from "./pages/detailEmployee.vue";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: SignIn,
    },
    {
      path: "/dashboard",
      component: Dashboard,
    },
    {
      path: "/dashboard/vacation",
      component: Vacation,
    },
    {
      path: "/dashboard/benifits",
      component: Benifits,
    },
    {
      path: "/employees",
      component: Employees,
    },
    {
      path: "/alert",
      component: Alert,
    },
    {
      path: "/Setting",
      component: Setting,
    },
    {
      path: "/event/:eventId",
      name: "EventDetail",
      component: EventDetailPage, // Replace with the actual component for event details
      props: true,
    },
    {
      path: "/employee/:employeeId",
      name: "EmployeeDetail",
      component: DetailEmployee, // Replace with the actual component for event details
      props: true,
    },
  ],
});

export default router;
