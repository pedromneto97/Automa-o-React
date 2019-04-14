// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Residence from "views/Residence/Residence.jsx";
import Room from "views/Room/Room.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";


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
    },
    {
        path: "/user",
        name: "User Profile",
        icon: Person,
        component: UserProfile,
        layout: "/admin",
        invisible: false
    },
    {
        path: "/table",
        name: "Table List",
        icon: "content_paste",
        component: TableList,
        layout: "/admin",
        invisible: false
    },
    {
        path: "/typography",
        name: "Typography",
        icon: LibraryBooks,
        component: Typography,
        layout: "/admin",
        invisible: false
    },
    {
        path: "/icons",
        name: "Icons",
        icon: BubbleChart,
        component: Icons,
        layout: "/admin",
        invisible: false
    },
    {
        path: "/maps",
        name: "Maps",
        icon: LocationOn,
        component: Maps,
        layout: "/admin",
        invisible: false
    },
    {
        path: "/notifications",
        name: "Notifications",
        icon: Notifications,
        component: NotificationsPage,
        layout: "/admin",
        invisible: false
    },
    {
        path: "/upgrade-to-pro",
        name: "Upgrade To PRO",
        icon: Unarchive,
        component: UpgradeToPro,
        layout: "/admin",
        invisible: false
    },
];

export default dashboardRoutes;
