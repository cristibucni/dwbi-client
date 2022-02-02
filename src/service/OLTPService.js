import axios from 'axios';
import {
  LOGIN_API_PATH,
  GET_ORDER_API_PATH,
  GET_SALES_API_PATH,
  EDIT_ORDERS_API_PATH,
  GET_MENUS_API_PATH,
  GET_SALES_TOTAL_10_YEARS_API_PATH,
  GET_ITEM_TOTAL_SALES_ON_MENU_API_PATH,
  GET_ITEM_TOTAL_SALES_LAST_YEAR_THIS_YEAR_ON_MENU_API_PATH,
  GET_REPORT_4,
  GET_REPORT_5,
  CREATE_ORDER_API_PATH,
  GET_ALL_ORDERS,
} from './constants';

class OLTP {
  login = async (payload) => {
    return await axios.post(LOGIN_API_PATH, payload);
  };

  getOrders = async (customerId) => {
    return await axios.get(GET_ORDER_API_PATH, { params: { customerId } });
  };

  getAllOrders = async () => {
    return await axios.get(GET_ALL_ORDERS);
  };

  getAllSales = async () => {
    return await axios.get(GET_SALES_API_PATH);
  };

  editOrder = async (payload) => {
    return await axios.post(EDIT_ORDERS_API_PATH, payload);
  };

  getMenus = async () => {
    return await axios.get(GET_MENUS_API_PATH);
  };
  getSalesTotalValueFor10Years = async () => {
    return await axios.get(GET_SALES_TOTAL_10_YEARS_API_PATH);
  };
  getItemSales = async () => {
    return await axios.get(GET_ITEM_TOTAL_SALES_ON_MENU_API_PATH);
  };
  getItemSalesComparison = async () => {
    return await axios.get(
      GET_ITEM_TOTAL_SALES_LAST_YEAR_THIS_YEAR_ON_MENU_API_PATH
    );
  };
  getAverageDeliveryTime = async () => {
    return await axios.get(GET_REPORT_4);
  };
  getSalesForItemsThatRequireCooking = async () => {
    return await axios.get(GET_REPORT_5);
  };
  createOrder = async (payload) => {
    return await axios.post(CREATE_ORDER_API_PATH, payload);
  };
}

export default new OLTP();
