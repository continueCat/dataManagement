import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";
import {
  setToken as _setToken,
  getToken,
  getUserInfo,
  removeToken,
  removeUserInfo,
  setUserInfo,
} from "../../utils";

const userStore = createSlice({
  name: "user",
  //初始数据状态
  initialState: {
    token: getToken() || "",
    userName: getUserInfo() || "",
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },

    setUserName(state, action) {
      state.userName = action.payload;
      setUserInfo(action.payload);
    },

    LoginOut(state) {
      state.token = "";
      state.userName = "";
      removeToken();
      removeUserInfo();
    },
  },
});

// 异步修改方法
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/api/user/login", loginForm);
    const userName = loginForm.username;
    dispatch(setToken(res.data.result.data.token));
    dispatch(setUserName(userName));
  };
};

const { setToken, setUserName, LoginOut } = userStore.actions;
const userReducer = userStore.reducer;
export default userReducer;
export { setToken, fetchLogin, setUserName, LoginOut };
