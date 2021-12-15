import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_PROFILE,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Register User

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);
      await axios.post("/api/profile");
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    console.log("there is token");
    setAuthToken(localStorage.token);
    console.log("token set!");
  }

  try {
    console.log(0);
    const res = await axios.get("/api/auth");
    const res2 = await axios.get("/api/profile/me");
    console.log({ res });
    console.log({ res2 });
    console.log(1);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    console.log(2);
    dispatch({
      type: GET_PROFILE,
      payload: res2.data,
    });
  } catch (err) {
    console.log(3);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//LOGOUT / clear everything

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
