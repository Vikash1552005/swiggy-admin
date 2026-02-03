import axios from "axios";
import { useEffect, useState } from "react";
import AdminUserForm from "../components/AdminUserForm";
import AdminUsersTable from "../components/AdminUsersTable";

const AllAdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                "http://localhost:5000/api/admin",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(data.users);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <AdminUserForm
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                refreshUsers={fetchUsers}
            />

            <AdminUsersTable
                users={users}
                setSelectedUser={setSelectedUser}
                refreshUsers={fetchUsers}
            />
        </>
    );
};

export default AllAdminUsers;
