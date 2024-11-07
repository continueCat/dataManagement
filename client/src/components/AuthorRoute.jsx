import { Navigate } from "react-router-dom";
import { getToken } from "../utils";

//HOC高阶组件，接受一个组件作为参数，返回一个新组件
// token控制路由权限
const AuthorRoute = ({ children }) => {
  //{children}从props对象中正确解构出children属性
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export { AuthorRoute };
