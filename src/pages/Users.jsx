import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [form] = Form.useForm();

  // ✅ Normalize role
  const currentRole = localStorage.getItem("role")?.toLowerCase();

  // ✅ Axios instance with auth
  const axiosAuth = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  axiosAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // 🔹 Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosAuth.get("/user");
      setUsers(res.data.users);
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Block / Unblock
  const toggleBlock = async (id) => {
    try {
      await axiosAuth.patch(`/user/${id}/block`);
      message.success("Status updated");
      fetchUsers();
    } catch {
      message.error("Action not allowed");
    }
  };

  // 🔹 Open Edit Modal
  const openEdit = (record) => {
    setEditUser(record);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
    });
    setEditOpen(true);
  };

  // 🔹 Update User
  const updateUser = async () => {
    try {
      const values = await form.validateFields();
      await axiosAuth.put(`/user/${editUser._id}`, values);
      message.success("User updated");
      setEditOpen(false);
      fetchUsers();
    } catch {
      message.error("Update failed");
    }
  };

  // 🔹 Delete User
  const handleDelete = async (id) => {
    try {
      await axiosAuth.delete(`/user/${id}`);
      message.success("User deleted");
      fetchUsers();
    } catch {
      message.error("Delete not allowed");
    }
  };

  // 🔹 Table columns
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Status",
      dataIndex: "blocked",
      render: (blocked) =>
        blocked ? <Tag color="red">BLOCKED</Tag> : <Tag color="green">ACTIVE</Tag>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            size="small"
            onClick={() => openEdit(record)}
            disabled={currentRole !== "super_admin"}
          >
            Edit
          </Button>

          <Button
            size="small"
            style={{ marginLeft: 8 }}
            type={record.blocked ? "default" : "primary"}
            onClick={() => toggleBlock(record._id)}
            disabled={currentRole !== "super_admin"}
          >
            {record.blocked ? "Unblock" : "Block"}
          </Button>

          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button
              danger
              size="small"
              style={{ marginLeft: 8 }}
              disabled={currentRole !== "super_admin"}
            >
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Card title="User Management">
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={users}
          loading={loading}
          pagination={{ pageSize: 6 }}
        />
      </Card>

      {/* 🔹 Edit Modal */}
      <Modal
        title="Edit User"
        open={editOpen}
        onOk={updateUser}
        onCancel={() => setEditOpen(false)}
        okButtonProps={{ disabled: currentRole !== "super_admin" }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Users;
