import { useEffect } from "react";
import { request } from "../../utils";
const Layout = () => {
  useEffect(() => {
    request.post("/api/data", {
      name: "zhangsan",
      description: "hello",
      tag: "human",
    });
  }, []);
  return <div>Layout</div>;
};
export default Layout;
