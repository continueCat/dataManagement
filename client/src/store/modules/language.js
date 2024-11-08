import { createSlice } from "@reduxjs/toolkit";
import { LangAPI, setLangAPI } from "../../apis/lang";

const LangStore = createSlice({
  name: "language",
  initialState: {
    language: "zh",
  },

  //同步修改方法
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

//异步修改方法
const fetchLanguage = () => {
  return async (disPatch) => {
    const res = await LangAPI();
    disPatch(setLanguage(res.data.data));
  };
};

const updateLanguage = (lang) => {
  return async (disPatch) => {
    await setLangAPI(lang);
    const curLang = await LangAPI();
    console.log(curLang.data.data);
    disPatch(setLanguage(curLang.data.data));
  };
};

const { setLanguage } = LangStore.actions;
const langReducer = LangStore.reducer;
export default langReducer;
export { setLanguage, fetchLanguage, updateLanguage };
