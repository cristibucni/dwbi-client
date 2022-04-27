import axios from 'axios';

class AbstractService {
  constructor(db) {
    this.db = db;
  }

  getOrders = async () => {
    return await axios.get(this.db.GET_ORDER);
  };

  getCustomers = async () => {
    return await axios.get(this.db.GET_CUSTOMER);
  };

  getItems = async () => {
    return await axios.get(this.db.GET_ITEM);
  };

  getLocations = async () => {
    return await axios.get(this.db.GET_LOCATION);
  };

  getMenus = async () => {
    return await axios.get(this.db.GET_MENU);
  };

  getVendors = async () => {
    return await axios.get(this.db.GET_VENDOR);
  };

  createOrder = async (payload) => {
    return await axios.post(this.db.CREATE_ORDER, payload);
  };

  createCustomer = async (payload) => {
    return await axios.post(this.db.CREATE_CUSTOMER, payload);
  };

  createItem = async (payload) => {
    return await axios.post(this.db.CREATE_ITEM, payload);
  };

  createLocation = async (payload) => {
    return await axios.post(this.db.CREATE_LOCATION, payload);
  };

  createVendor = async (payload) => {
    return await axios.post(this.db.CREATE_VENDOR, payload);
  };

  editCustomer = async (payload) => {
    return await axios.post(this.db.UPDATE_CUSTOMER, payload);
  };

  editItem = async (payload) => {
    return await axios.post(this.db.UPDATE_ITEM, payload);
  };

  editLocation = async (payload) => {
    return await axios.post(this.db.UPDATE_LOCATION, payload);
  };

  editOrder = async (payload) => {
    return await axios.post(this.db.UPDATE_ORDER, payload);
  };

  editVendor = async (payload) => {
    return await axios.post(this.db.UPDATE_VENDOR, payload);
  };

  deleteCustomer = async (payload) => {
    return await axios.delete(
      `${this.db.DEETE_CUSTOMER}?customerId=${payload.id}`
    );
  };

  deleteItem = async (payload) => {
    return await axios.delete(`${this.db.DELETE_ITEM}?itemId=${payload.id}`);
  };

  deleteLocation = async (payload) => {
    return await axios.delete(
      `${this.db.DELETE_LOCATION}?locationId=${payload.id}`
    );
  };

  deleteOrder = async (payload) => {
    return await axios.delete(`${this.db.DELETE_ORDER}?orderId=${payload.id}`);
  };

  deleteVendor = async (payload) => {
    return await axios.delete(
      `${this.db.DELETE_VENDOR}?vendorId=${payload.id}`
    );
  };
}

export default AbstractService;
