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
  DELETE_INFO_RESET,
  DELETE_INFO_SUCCESS,
  INFO_DETAILS_FAIL,
  INFO_DETAILS_REQUEST,
  INFO_DETAILS_SUCCESS,
  NEW_INFO_FAIL,
  NEW_INFO_REQUEST,
  NEW_INFO_RESET,
  NEW_INFO_SUCCESS,
  UPDATE_INFO_FAIL,
  UPDATE_INFO_REQUEST,
  UPDATE_INFO_RESET,
  UPDATE_INFO_SUCCESS,
} from "../constants/infoConstant";

export const infosReducer = (state = { infos: [] }, action) => {
  switch (action.type) {
    case ALL_INFO_REQUEST:
    case ADMIN_INFO_REQUEST:
      return {
        loading: true,
        infos: [],
      };
    case ALL_INFO_SUCCESS:
      return {
        loading: false,
        infos: action.payload.infos,
      };

    case ADMIN_INFO_SUCCESS:
      return {
        loading: false,
        infos: action.payload,
      };

    case ALL_INFO_FAIL:
    case ADMIN_INFO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const infoDetailsReducer = (state = { info: {} }, action) => {
  switch (action.type) {
    case INFO_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case INFO_DETAILS_SUCCESS:
      return {
        loading: false,
        info: action.payload,
      };
    case INFO_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newInfoReducer = (state = { info: {} }, action) => {
  switch (action.type) {
    case NEW_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_INFO_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        info: action.payload.info,
      };
    case NEW_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_INFO_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const infoReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INFO_REQUEST:
    case UPDATE_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_INFO_FAIL:
    case UPDATE_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_INFO_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_INFO_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
