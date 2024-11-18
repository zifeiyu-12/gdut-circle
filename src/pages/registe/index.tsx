import { Input, Button, Form, message, Upload, UploadProps } from "antd";
import { useState } from "react";
import { RegisteInfo } from "../../types/user";
import { registe } from "../../api/user";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Registe = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (values: RegisteInfo) => {
    try {
      setLoading(true);
      const { username, password, email } = values;
      const res = await registe({
        username,
        password,
        email,
        profile: imageUrl ?? "",
      });
      if (res.code === 200) {
        // 登录成功
        localStorage.setItem("token", res.data?.accessToken ?? "");
        message.success("注册成功");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = ({ file }) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj as File);
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </button>
  );
  return (
    <div className="flex items-center h-screen w-screen justify-center">
      <div className="px-10 py-5 rounded-md shadow-md ">
        <div className="text-lg font-bold mb-3">注册入场券</div>
        <Form
          disabled={loading}
          onFinish={submit}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={JSON.parse(localStorage.getItem("loginInfo") ?? "{}")}
          autoComplete="off"
        >
          <Upload
            listType="picture-circle"
            className="avatar-uploader text-center"
            showUploadList={false}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                className="w-full rounded-full h-full object-cover"
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                type: "email",
                message: "请输入正确的邮箱地址",
              },
            ]}
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
          <Form.Item
            label="确认密码"
            name="okPassword"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致"));
                },
              }),
            ]}
          >
            <Input.Password />
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

export default Registe;
