import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";
import { setToken as _setToken, getToken } from "../../utils";

const userStore = createSlice({
  name: "user",
  //初始数据状态
  initialState: {
    token: getToken() || "",
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
  },
});

// 异步修改方法
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/api/user/login", loginForm);
    dispatch(setToken(res.data.result.data.token));
  };
};

const { setToken } = userStore.actions;
const userReducer = userStore.reducer;
export default userReducer;
export { setToken, fetchLogin };
