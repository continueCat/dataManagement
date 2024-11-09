import { request } from "../utils";
export const DataListAPI = (ctx) => {
  return request({
    url: "/api/data",
    method: "get",
    params: ctx,
  });
};
