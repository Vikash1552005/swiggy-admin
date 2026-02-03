import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";

const Login = () => {
  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        values
      );
      console.log(" login res : ", res.data);

      if (res.data.role === "user") {
        message.error("Admin access only");
        return;
      }

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("role", res.data.role);



      message.success("Login successful");
      window.location.href = "/admin/dashboard";
    } catch (error) {
      message.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        {/* 🔝 Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Panel
          </h1>
          <p className="text-gray-500 mt-1">
            Sign in to manage your store
          </p>
        </div>

        {/* 📝 Form */}
        <Form
          name="admin_login"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter valid email" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="admin@example.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="••••••••"
              size="large"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <Checkbox>Remember me</Checkbox>
            <span className="text-sm text-blue-600 cursor-pointer">
              Forgot password?
            </span>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            className="bg-gray-900 hover:bg-gray-800"
          >
            Login
          </Button>
        </Form>

        {/* 🔻 Footer */}
        <div className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Admin Dashboard
        </div>

      </div>
    </div>
  );
};

export default Login;
