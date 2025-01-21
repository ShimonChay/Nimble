import axios from "axios";
import { BASE_URL, SUPPLIER_URL } from "../consts/axios";

const SupplierService = {
  getSuppliersData: async (searchInput?: string) => {
    return (await (axios.get(`${BASE_URL}${SUPPLIER_URL}/search`, { params: { searchInput } }))).data;
  },
}

export default SupplierService;
