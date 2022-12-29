import Login from "views/Login";
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import ProgramsTable from "views/ProgramsTable";
import TouristMap from "views/TouristMap.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import AgencyProfile from "views/AgencyProfile.js"
import Agencies from "views/Agencies.js"
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/tourist"
  },

  {
    path: "/tourist-profile",
    name: "User Profile",
    icon: "nc-icon nc-spaceship",
    component: UserPage,
    layout: "/tourist"
  },

  {
    path: "/agnecies",
    name: "Agencies",
    icon: "nc-icon nc-spaceship",
    component: Agencies,
    layout: "/tourist"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: TouristMap,
    layout: "/tourist"
  },

];
export default routes;
