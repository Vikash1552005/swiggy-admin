import { Button, Card, Form, Input, message, Select, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { Title } = Typography;
const { Option } = Select;

const AdminUserForm = ({ selectedUser, setSelectedUser, refreshUsers }) => {
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [form] = Form.useForm();

    const currentRole = localStorage.getItem("role")?.toLowerCase();


    useEffect(() => {
        if (selectedUser) {
            setShowForm(true);
            form.setFieldsValue(selectedUser);
        }
    }, [selectedUser, form]);

    const handleCancel = () => {
        form.resetFields();
        setSelectedUser(null);
        setShowForm(false);
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const url = selectedUser
                ? `http://localhost:5000/api/admin/${selectedUser._id}`
                : "http://localhost:5000/api/admin";

            const method = selectedUser ? "put" : "post";

            await axios[method](url, values, {
                headers: { Authorization: `Bearer ${token}` },
            });

            message.success(
                selectedUser
                    ? "Admin updated successfully"
                    : "Admin created successfully"
            );

            handleCancel();
            refreshUsers();
        } catch (err) {
            message.error(err.response?.data?.message || "Action failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                type={showForm ? "default" : "primary"}
                danger={showForm}
                disabled={currentRole !== "super_admin"}
                onClick={() => {
                    if (showForm) {
                        handleCancel();
                    } else {
                        form.resetFields();
                        setSelectedUser(null);
                        setShowForm(true);
                    }
                }}
                style={{ marginBottom: 20 }}
            >
                {showForm ? "Cancel" : "+ Create Admin User"}
            </Button>

            <Form
                form={form}
                layout="vertical"
                style={{ display: showForm ? "block" : "none" }}
                onFinish={onFinish}
            >
                <Card>
                    <Title level={4}>
                        {selectedUser ? "Edit Admin User" : "Create Admin User"}
                    </Title>

                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input disabled={!!selectedUser} />
                    </Form.Item>

                    {!selectedUser && (
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, min: 6 }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    )}

                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select>
                            <Option value="admin">Admin</Option>
                            <Option value="super_admin">Super Admin</Option>
                            <Option value="product_manager_admin">Product Manager</Option>
                            <Option value="order_manager_admin">Order Manager</Option>
                            <Option value="customer_care_admin">Customer Care</Option>
                            <Option value="seller_admin">Seller</Option>
                            <Option value="accounts_admin">Accounts</Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block loading={loading}>
                        {selectedUser ? "Update Admin" : "Create Admin"}
                    </Button>
                </Card>
            </Form>
        </>
    );
};

export default AdminUserForm;
