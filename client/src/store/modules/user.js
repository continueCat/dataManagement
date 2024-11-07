import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";

const userStore = createSlice({
  name: "user",
  //初始数据状态
  initialState: {
    token: "",
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

// 异步修改方法
const fetchLogin = () => {
  return async (dispatch) => {
    const res = await request.post("/api/user/login", {
      username: "zyz",
      password: "123456",
    });
    dispatch(setToken(res.data.result.data.token));
    // console.log(res.data.result.data.token);
  };
};

const { setToken } = userStore.actions;
const userReducer = userStore.reducer;
export default userReducer;
export { setToken, fetchLogin };
