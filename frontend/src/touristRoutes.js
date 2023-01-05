import TouristLogin from "views/TouristLogin";
import Dashboard from "views/Dashboard.js";
import TouristDashboard from "views/TouristDashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import ProgramsTable from "views/ProgramsTable";
import TouristMap from "views/TouristMap.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import AgencyProfile from "views/AgencyProfile.js"
import Agencies from "views/Agencies.js"
import SearchProgram from "views/SearchProgram"

var routes = [
  {
    path: "/dashboard-tourist",
    name: "User Dashboard",
    icon: "nc-icon nc-bank",
    component: TouristDashboard,
    layout: "/tourist"
  },
  

  {
    path: "/tourist-profile",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
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
    path: "/searchProgram",
    name: "Programs",
    icon: "nc-icon nc-tile-56",
    component: SearchProgram,
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