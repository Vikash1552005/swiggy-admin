import { Button, Popconfirm, Switch, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("http://localhost:5000/api/products");
            setProducts(data.products);
        } catch (error) {
            message.error("Failed to fetch products");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            message.success("Product deleted");
            fetchProducts();
        } catch (error) {
            message.error("Failed to delete product");
        }
    };

    const toggleStatus = async (id) => {
        try {
            const { data } = await axios.patch(`http://localhost:5000/api/products/toggle/${id}`);
            message.success(`Product ${data.isActive ? "activated" : "deactivated"}`);
            fetchProducts();
        } catch (error) {
            message.error("Failed to toggle status");
        }
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "thumbnail",
            key: "thumbnail",
            render: (thumbnail) => (
                <img
                    src={thumbnail}
                    alt="product"
                    style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
                />
            ),
        },
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Price", dataIndex: "price", key: "price" },
        { title: "Stock", dataIndex: "stock", key: "stock" },
        { title: "Category", dataIndex: "category", key: "category" },
        {
            title: "Active",
            dataIndex: "isActive",
            key: "isActive",
            render: (_, record) => (
                <Switch checked={record.isActive} onChange={() => toggleStatus(record._id)} />
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <Link to={`/admin/products/edit/${record._id}`}>
                        <Button type="primary">Edit</Button>
                    </Link>
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record._id)}>
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return <Table dataSource={products} columns={columns} loading={loading} rowKey="_id" />;
};

export default AdminProducts;
