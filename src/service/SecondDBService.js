import axios from 'axios';
import {
  GET_ORDER_SECOND_DB,
  GET_CUSTOMER_SECOND_DB,
  GET_ITEM_SECOND_DB,
  GET_LOCATION_SECOND_DB,
  GET_MENU_SECOND_DB,
  GET_VENDOR_SECOND_DB,
} from './constants';

class SecondDBService {
  getOrdersFirstDB = async () => {
    return await axios.get(GET_ORDER_SECOND_DB);
  };

  getCustomers = async () => {
    return await axios.get(GET_CUSTOMER_SECOND_DB);
  };

  getItems = async () => {
    return await axios.get(GET_ITEM_SECOND_DB);
  };

  getLocations = async () => {
    return await axios.get(GET_LOCATION_SECOND_DB);
  };

  getMenus = async () => {
    return await axios.get(GET_MENU_SECOND_DB);
  };

  getVendors = async () => {
    return await axios.get(GET_VENDOR_SECOND_DB);
  };
}

export default new SecondDBService();
