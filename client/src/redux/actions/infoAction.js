import axios from "axios";
import {
  ADMIN_INFO_FAIL,
  ADMIN_INFO_REQUEST,
  ADMIN_INFO_SUCCESS,
  ALL_INFO_FAIL,
  ALL_INFO_REQUEST,
  ALL_INFO_SUCCESS,
  CLEAR_ERRORS,
  DELETE_INFO_FAIL,
  DELETE_INFO_REQUEST,
  DELETE_INFO_SUCCESS,
  INFO_DETAILS_FAIL,
  INFO_DETAILS_REQUEST,
  INFO_DETAILS_SUCCESS,
  NEW_INFO_FAIL,
  NEW_INFO_REQUEST,
  NEW_INFO_SUCCESS,
  UPDATE_INFO_FAIL, 
  UPDATE_INFO_REQUEST,
  UPDATE_INFO_SUCCESS,
} from "../constants/infoConstant";

export const getInfos = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_INFO_REQUEST });

    const { data } = await axios.get("/api/infos");
    console.log(data);

    dispatch({
      type: ALL_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// detail
export const getInfoDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INFO_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/info/${id}`);

    dispatch({
      type: INFO_DETAILS_SUCCESS,
      payload: data.info,
    });
  } catch (error) {
    dispatch({
      type: INFO_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Products For Admin
export const getAdminInfo = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_INFO_REQUEST });

    const { data } = await axios.get("/api/infos");

    dispatch({ 
      type: ADMIN_INFO_SUCCESS,
      payload: data.infos,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createInfo = (infoData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_INFO_REQUEST });

    const config = {
      infos: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/info`, infoData, config);

    dispatch({
      type: NEW_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteInfo = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_INFO_REQUEST });

    const { data } = await axios.delete(`/api/info/${id}`);

    dispatch({
      type: DELETE_INFO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateInfo = (id, infoData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_INFO_REQUEST });

    const config = {
      infos: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/info/${id}`, infoData, config);

    dispatch({
      type: UPDATE_INFO_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
