import { request } from "../utils";
export const LoginAPI = (data) => {
  return request({
    url: "/api/user/login",
    method: "POST",
    data,
  });
};
