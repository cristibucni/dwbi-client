import axios from 'axios';
import {
  GET_ORDER_GLOBAL_DB,
  GET_CUSTOMER_GLOBAL_DB,
  GET_ITEM_GLOBAL_DB,
  GET_LOCATION_GLOBAL_DB,
  GET_MENU_GLOBAL_DB,
  GET_VENDOR_GLOBAL_DB,
} from './constants';

class GlobalDBService {
  getOrdersFirstDB = async () => {
    return await axios.get(GET_ORDER_GLOBAL_DB);
  };

  getCustomers = async () => {
    return await axios.get(GET_CUSTOMER_GLOBAL_DB);
  };

  getItems = async () => {
    return await axios.get(GET_ITEM_GLOBAL_DB);
  };

  getLocations = async () => {
    return await axios.get(GET_LOCATION_GLOBAL_DB);
  };

  getMenus = async () => {
    return await axios.get(GET_MENU_GLOBAL_DB);
  };

  getVendors = async () => {
    return await axios.get(GET_VENDOR_GLOBAL_DB);
  };
}

export default new GlobalDBService();
