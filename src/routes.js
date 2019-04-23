// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Residence from "views/Residence/Residence.jsx";
import ResidenceInfo from "views/Residence/ResidenceInfo.jsx";
import Room from "views/Room/Room.jsx";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    invisible: false
  },
  {
    path: "/residence/info/:alias",
    name: "Residence Info",
    component: ResidenceInfo,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/residence/:alias",
    name: "Residence",
    component: Residence,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/room/:alias",
    name: "Room",
    component: Room,
    layout: "/admin",
    invisible: true
  }
];

export default dashboardRoutes;
