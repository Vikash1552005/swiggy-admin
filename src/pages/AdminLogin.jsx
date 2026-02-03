import { Button, Form, Input, message } from "antd";
import axios from "axios";

const AdminLogin = () => {
    const onFinish = async (values) => {
        const res = await axios.post(
            "http://localhost:5000/api/auth/login",
            values
        );

        if (res.data.role !== "admin") {
            return message.error("Admin access only");
        }

        localStorage.setItem("adminToken", res.data.token);
        window.location.href = "/admin/dashboard";
    };

    return (
        <Form onFinish={onFinish}>
            <Input name="email" placeholder="Admin Email" />
            <Input.Password name="password" placeholder="Password" />
            <Button htmlType="submit">Login</Button>
        </Form>
    );
};

export default AdminLogin;
