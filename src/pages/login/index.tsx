import { Input, Button, Form, Checkbox, Row, Col, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { loginInfo } from "../../types/user";
import { login } from "../../api/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (values: loginInfo & { remember: boolean }) => {
    try {
      setLoading(true);
      const res = await login(values);
      if (res.code === 200) {
        // 登录成功
        localStorage.setItem("token", res.data?.accessToken ?? "");
        if (values.remember) {
          localStorage.setItem("loginInfo", JSON.stringify(values));
        } else {
          localStorage.removeItem("loginInfo");
        }
        message.success("登录成功");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center h-screen w-screen justify-center">
      <div className="px-10 py-5 rounded-md shadow-md ">
        <div className="text-lg font-bold mb-3">入场券</div>
        <Form
          disabled={loading}
          onFinish={submit}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={JSON.parse(localStorage.getItem("loginInfo") ?? "{}")}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item layout="horizontal" noStyle>
            <Row>
              <Col span={9}>
                <FormItem noStyle name="remember" valuePropName="checked">
                  <Checkbox>记住我</Checkbox>
                </FormItem>
              </Col>
              <Col span={15}>
                <FormItem noStyle>
                  没有账户? 点击
                  <span
                    className="text-blue-600"
                    onClick={() => {
                      navigate("/registe");
                    }}
                  >
                    创建账号
                  </span>
                </FormItem>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item className="mt-3">
            <Button type="primary" htmlType="submit" className="w-full">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
