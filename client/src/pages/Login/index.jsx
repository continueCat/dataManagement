import "./style.scss";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { fetchLogin, setUserName } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../utils";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { username, password } = values;

    await dispatch(fetchLogin({ username, password }));
    //跳转到首页
    navigate("/");
    //提示
    message.success("登录成功");
  };
  return (
    <div className="login">
      <Form onFinish={onFinish} autoComplete="off" className="login-form">
        <h1 className="login-title">Login</h1>
        <Form.Item
          // label="Username"
          name="username"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            autoComplete="off"
            prefix={<UserOutlined />}
            placeholder="Enter your username"
          />
        </Form.Item>

        <Form.Item
          // label="Password"
          name="password"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            autoComplete="new-password"
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
