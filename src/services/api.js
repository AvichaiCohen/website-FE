import { axiosInstance as axios } from "./axiosInstance";
const CREATE_NEW_USER = () => `api/public/user/create`;
const AUTHENTICATE = () => `api/public/authenticate`;
const GET_ALL_ITEMS = () => `website/item/getAll`;
const CREATE_NEW_ORDER = () => `website/order/`;
const ADD_ITEM_TO_LIST = () => `website/item/order/add`;

const TEST_API = () => `api/public/test1`;

export const addItemToList = (orderList) => {
  return axios.post(ADD_ITEM_TO_LIST(), orderList);
};
export const createNewOrder = (userOrder) => {
  return axios.post(CREATE_NEW_ORDER(), userOrder);
};

export const createNewUser = (userBody) => {
  return axios.post(CREATE_NEW_USER(), userBody);
};

export const authenticate = (userBody) => {
  return axios.post(AUTHENTICATE(), userBody);
};

export const testAuthenticatedApi = (params) => {
  return axios.get(TEST_API(), { params: params });
};

export const getAllItems = () => {
  return axios.get(GET_ALL_ITEMS());
};
