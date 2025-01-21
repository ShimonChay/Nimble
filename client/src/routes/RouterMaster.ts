import { MAIN_VIEW, SUPPLIER_DETAILS } from "../consts/routes";
import MainView from "../pages/MainView/MainView";
import SupplierDetails from "../pages/SupplierDetails/SupplierDetails";

const RoutesMaster = [
  {
    path: MAIN_VIEW,
    component: MainView,
  },
  {
    path: SUPPLIER_DETAILS,
    component: SupplierDetails,
  },
];

export default RoutesMaster;
