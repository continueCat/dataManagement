import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import langReducer from "./modules/language";

const store = configureStore({
  reducer: {
    user: userReducer,
    language: langReducer,
  },
});

export default store;
