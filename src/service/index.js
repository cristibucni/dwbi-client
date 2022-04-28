import AbstractService from './AbstractService';

const FIRST_DB = {
  GET_CUSTOMER: '/api/CustomerFirstDb/Get',
  CREATE_CUSTOMER: '/api/CustomerFirstDb/Create',
  UPDATE_CUSTOMER: '/api/CustomerFirstDb/Update',
  DELETE_CUSTOMER: '/api/CustomerFirstDb/Delete',
  GET_ITEM: '/api/ItemFirstDb/Get',
  CREATE_ITEM: '/api/ItemFirstDb/Create',
  UPDATE_ITEM: '/api/ItemFirstDb/Update',
  DELETE_ITEM: '/api/ItemFirstDb/Delete',
  GET_LOCATION: '/api/LocationFirstDb/Get',
  CREATE_LOCATION: '/api/LocationFirstDb/Create',
  UPDATE_LOCATION: '/api/LocationFirstDb/Update',
  DELETE_LOCATION: '/api/LocationFirstDb/Delete',
  GET_MENU: '/api/MenuFirstDb/Get',
  GET_ORDER: '/api/OrderFirstDb/Get',
  CREATE_ORDER: '/api/OrderFirstDb/Create',
  UPDATE_ORDER: '/api/OrderFirstDb/Update',
  DELETE_ORDER: '/api/OrderFirstDb/Delete',
  GET_VENDOR: '/api/VendorFirstDb/Get',
  CREATE_VENDOR: '/api/VendorFirstDb/Create',
  UPDATE_VENDOR: '/api/VendorFirstDb/Update',
  DELETE_VENDOR: '/api/VendorFirstDb/Delete',
};
const SECOND_DB = {
  GET_CUSTOMER: '/api/CustomerSecondDb/Get',
  CREATE_CUSTOMER: '/api/CustomerSecondDb/Create',
  UPDATE_CUSTOMER: '/api/CustomerSecondDb/Update',
  DELETE_CUSTOMER: '/api/CustomerSecondDb/Delete',
  GET_ITEM: '/api/ItemSecondDb/Get',
  CREATE_ITEM: '/api/ItemSecondDb/Create',
  UPDATE_ITEM: '/api/ItemSecondDb/Update',
  DELETE_ITEM: '/api/ItemSecondDb/Delete',
  GET_LOCATION: '/api/LocationSecondDb/Get',
  CREATE_LOCATION: '/api/LocationSecondDb/Create',
  UPDATE_LOCATION: '/api/LocationSecondDb/Update',
  DELETE_LOCATION: '/api/LocationSecondDb/Delete',
  GET_MENU: '/api/MenuFirstDb/Get',
  GET_ORDER: '/api/OrderSecondDb/Get',
  CREATE_ORDER: '/api/OrderSecondDb/Create',
  UPDATE_ORDER: '/api/OrderSecondDb/Update',
  DELETE_ORDER: '/api/OrderSecondDb/Delete',
  GET_VENDOR: '/api/VendorSecondDb/Get',
  CREATE_VENDOR: '/api/VendorSecondDb/Create',
  UPDATE_VENDOR: '/api/VendorSecondDb/Update',
  DELETE_VENDOR: '/api/VendorSecondDb/Delete',
};
const GLOBAL_DB = {
  GET_CUSTOMER: '/api/CustomerFirstDb/Get',
  CREATE_CUSTOMER: '/api/CustomerFirstDb/Create',
  UPDATE_CUSTOMER: '/api/CustomerFirstDb/Update',
  DELETE_CUSTOMER: '/api/CustomerFirstDb/Delete',
  GET_ITEM: '/api/ItemGlobalDb/Get',
  CREATE_ITEM: '/api/ItemGlobalDb/Create',
  UPDATE_ITEM: '/api/ItemGlobalDb/Update',
  DELETE_ITEM: '/api/ItemGlobalDb/Delete',
  GET_LOCATION: '/api/LocationFirstDb/Get',
  CREATE_LOCATION: '/api/LocationFirstDb/Create',
  UPDATE_LOCATION: '/api/LocationFirstDb/Update',
  DELETE_LOCATION: '/api/LocationFirstDb/Delete',
  GET_MENU: '/api/MenuFirstDb/Get',
  GET_ORDER: '/api/OrderGlobalDb/Get',
  CREATE_ORDER: '/api/OrderGlobalDb/Create',
  UPDATE_ORDER: '/api/OrderGlobalDb/Update',
  DELETE_ORDER: '/api/OrderGlobalDb/Delete',
  GET_VENDOR: '/api/VendorGlobalDb/Get',
  CREATE_VENDOR: '/api/VendorGlobalDb/Create',
  UPDATE_VENDOR: '/api/VendorGlobalDb/Update',
  DELETE_VENDOR: '/api/VendorGlobalDb/Delete',
};

export const SERVICE_MAPPING = {
  firstdb: new AbstractService(FIRST_DB),
  seconddb: new AbstractService(SECOND_DB),
  globaldb: new AbstractService(GLOBAL_DB),
};
