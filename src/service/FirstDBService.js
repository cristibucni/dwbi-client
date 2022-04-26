import axios from 'axios';
import {
  GET_ORDER_FIRST_DB,
  GET_CUSTOMER_FIRST_DB,
  GET_ITEM_FIRST_DB,
  GET_LOCATION_FIRST_DB,
  GET_MENU_FIRST_DB,
  GET_VENDOR_FIRST_DB,
  UPDATE_CUSTOMER_FIRST_DB,
  DELETE_CUSTOMER_FIRST_DB,
  UPDATE_ITEM_FIRST_DB,
  DELETE_ITEM_FIRST_DB,
  UPDATE_LOCATION_FIRST_DB,
  DELETE_LOCATION_FIRST_DB,
  UPDATE_ORDER_FIRST_DB,
  DELETE_ORDER_FIRST_DB,
  UPDATE_VENDOR_FIRST_DB,
  DELETE_VENDOR_FIRST_DB,
} from './constants';

class FirstDBService {
  getOrdersFirstDB = async () => {
    return await axios.get(GET_ORDER_FIRST_DB);
  };

  getCustomers = async () => {
    return await axios.get(GET_CUSTOMER_FIRST_DB);
  };

  getItems = async () => {
    return await axios.get(GET_ITEM_FIRST_DB);
  };

  getLocations = async () => {
    return await axios.get(GET_LOCATION_FIRST_DB);
  };

  getMenus = async () => {
    return await axios.get(GET_MENU_FIRST_DB);
  };

  getVendors = async () => {
    return await axios.get(GET_VENDOR_FIRST_DB);
  };

  editCustomer = async (payload) => {
    return await axios.post(UPDATE_CUSTOMER_FIRST_DB, payload);
  };

  deleteCustomer = async (payload) => {
    return await axios.delete(
      `${DELETE_CUSTOMER_FIRST_DB}?customerId=${payload.id}`
    );
  };

  editItem = async (payload) => {
    return await axios.post(UPDATE_ITEM_FIRST_DB, payload);
  };

  deleteItem = async (payload) => {
    return await axios.delete(`${DELETE_ITEM_FIRST_DB}?itemId=${payload.id}`);
  };

  editLocation = async (payload) => {
    return await axios.post(UPDATE_LOCATION_FIRST_DB, payload);
  };

  deleteLocation = async (payload) => {
    return await axios.delete(
      `${DELETE_LOCATION_FIRST_DB}?locationId=${payload.id}`
    );
  };

  editOrder = async (payload) => {
    return await axios.post(UPDATE_ORDER_FIRST_DB, payload);
  };

  deleteOrder = async (payload) => {
    return await axios.delete(`${DELETE_ORDER_FIRST_DB}?orderId=${payload.id}`);
  };

  editVendor = async (payload) => {
    return await axios.post(UPDATE_VENDOR_FIRST_DB, payload);
  };

  deleteVendor = async (payload) => {
    return await axios.delete(
      `${DELETE_VENDOR_FIRST_DB}?vendorId=${payload.id}`
    );
  };
}

export default new FirstDBService();
