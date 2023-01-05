import Login from "views/Login";
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import ProgramsTable from "views/ProgramsTable";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import AgencyProfile from "views/AgencyProfile.js"
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },

  {
    path: "/agency-profile",
    name: "Agency profile",
    icon: "nc-icon nc-single-02",
    component: AgencyProfile,
    layout: "/admin"
  },
  {
    path: "/programs",
    name: "Programs",
    icon: "nc-icon nc-tile-56",
    component: ProgramsTable,
    layout: "/admin"
  },

  
];
export default routes;