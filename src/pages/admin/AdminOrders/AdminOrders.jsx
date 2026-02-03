import { useEffect, useState } from "react";
import { Table, Tag, Select, message, Spin, Input, Row, Col } from "antd";
import axios from "axios";

const { Option } = Select;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [msgApi, contextHolder] = message.useMessage();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (data.success) {
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      }
      setLoading(false);
    } catch (err) {
      msgApi.error("Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔍 Real world search & filter logic
  useEffect(() => {
    let data = [...orders];

    if (searchText) {
      data = data.filter(
        (o) =>
          o._id.toLowerCase().includes(searchText.toLowerCase()) ||
          o.user?.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter) {
      data = data.filter((o) => o.status === statusFilter);
    }

    setFilteredOrders(data);
  }, [searchText, statusFilter, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/orders/update",
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (data.success) {
        msgApi.success("Order status updated");
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: newStatus } : o
          )
        );
      }
    } catch (err) {
      msgApi.error("Failed to update status");
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      render: (id) => <span className="text-xs">{id}</span>,
    },
    {
      title: "User",
      dataIndex: ["user", "name"],
      render: (_, record) => record.user?.name || "N/A",
    },
    {
      title: "Items",
      dataIndex: "items",
      render: (items) =>
        items.map((i) => (
          <div key={i.product} className="flex justify-between">
            <span>{i.name} × {i.quantity}</span>
            <span>₹{(i.finalPrice || i.price).toLocaleString("en-IN")}</span>
          </div>
        )),
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      render: (price) => (
        <span className="font-semibold text-green-600">
          ₹{price.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 140 }}
          onChange={(value) => handleStatusChange(record._id, value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Processing">Processing</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      ),
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      render: (status) => (
        <Tag color={status === "Paid" ? "green" : "orange"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="p-6 z-20">
      {contextHolder}
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {/* 🔍 Search & Filter Bar */}
      <Row gutter={16} className="mb-4">
        <Col xs={24} md={12}>
          <Input
            placeholder="Search by Order ID or User Name"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>

        <Col xs={24} md={6}>
          <Select
            placeholder="Filter by Status"
            allowClear
            className="w-full"
            onChange={(value) => setStatusFilter(value)}
          >
            <Option value="Pending">Pending</Option>
            <Option value="Processing">Processing</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Delivered">Delivered</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </Col>
      </Row>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={filteredOrders}
          columns={columns}
          rowKey="_id"
        />
      )}
    </div>
  );
};

export default AdminOrders;
