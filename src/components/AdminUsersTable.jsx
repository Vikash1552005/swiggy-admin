import { Button, Popconfirm, Table, Tag, message } from "antd";
import axios from "axios";

const AdminUsersTable = ({ users, setSelectedUser, refreshUsers }) => {
    const token = localStorage.getItem("token");
      const currentRole = localStorage.getItem("role")?.toLowerCase();

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success("Admin deleted");
            refreshUsers();
        } catch {
            message.error("Delete failed");
        }
    };

    const columns = [
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
        {
            title: "Role",
            dataIndex: "role",
            render: (role) => <Tag>{role.replaceAll("_", " ")}</Tag>,
        },
        {
            title: "Actions",
            render: (_, record) => (
                <>
                    <Button  disabled={currentRole !== "super_admin"} type="link" onClick={() => setSelectedUser(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete admin?"

                        onConfirm={() => deleteUser(record._id)}
                    >
                        <Button  disabled={currentRole !== "super_admin"} type="link" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <Table
            rowKey="_id"
            columns={columns}
            dataSource={users}
            pagination={{ pageSize: 8 }}
        />
    );
};

export default AdminUsersTable;
