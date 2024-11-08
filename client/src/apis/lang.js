import { request } from "../utils";
export const LangAPI = () => {
  return request({
    url: "/api/lang",
    method: "Get",
  });
};

export const setLangAPI = (data) => {
  return request({
    url: "/api/lang",
    method: "POST",
    data,
  });
};
