import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Popconfirm,
    Select,
    Switch,
    Table,
    Upload,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { Option } = Select;

const AdminOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);
    const [form] = Form.useForm();

    // 🔹 FETCH OFFERS
    const fetchOffers = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/Offer/admin/offers");
            setOffers(res.data.offers);
        } catch (err) {
            message.error("Failed to fetch offers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    // 🔹 CREATE / UPDATE
    const onFinish = async (values) => {
        try {
            const formData = new FormData();

            Object.keys(values).forEach((key) => {
                if (key === "image" && values.image) {
                    formData.append("image", values.image.file);
                } else if (key === "validTill" && values.validTill) {
                    formData.append("validTill", values.validTill.toISOString());
                } else {
                    formData.append(key, values[key]);
                }
            });

            if (editingOffer) {
                await axios.put(
                    `http://localhost:5000/api/Offer/admin/offer/${editingOffer._id}`,
                    formData
                );
                message.success("Offer updated");
            } else {
                await axios.post("http://localhost:5000/api/Offer/admin/offer", formData);
                message.success("Offer created");
            }

            setOpen(false);
            setEditingOffer(null);
            form.resetFields();
            fetchOffers();
        } catch (err) {
            message.error("Something went wrong");
        }
    };

    // 🔹 DELETE
    const deleteOffer = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/Offer/admin/offer/${id}`);
            message.success("Offer deleted");
            fetchOffers();
        } catch {
            message.error("Failed to delete offer");
        }
    };

    // 🔹 TABLE COLUMNS
    const columns = [
        {
            title: "Image",
            render: (_, record) =>
                record.image?.url ? (
                    <img src={record.image.url} alt="offer" className="w-16 h-16 rounded" />
                ) : (
                    "—"
                ),
        },
        { title: "Title", dataIndex: "title" },
        { title: "Category", dataIndex: "category" },
        {
            title: "Discount",
            render: (_, r) =>
                r.discountType === "PERCENT" ? `${r.discount}%` : `₹${r.discount}`,
        },
        {
            title: "Valid Till",
            render: (_, r) => (r.validTill ? dayjs(r.validTill).format("DD MMM YYYY") : "—"),
        },
        {
            title: "Active",
            render: (_, r) => (
                <Switch
                    checked={r.isActive}
                    onChange={async (val) => {
                        await axios.put(`http://localhost:5000/api/Offer/admin/offer/${r._id}`, { isActive: val });
                        fetchOffers();
                    }}
                />
            ),
        },
        {
            title: "Actions",
            render: (_, r) => (
                <div className="flex gap-2">
                    <Button
                        size="small"
                        onClick={() => {
                            setEditingOffer(r);
                            setOpen(true);
                            form.setFieldsValue({
                                ...r,
                                validTill: r.validTill ? dayjs(r.validTill) : null,
                            });
                        }}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this offer?"
                        onConfirm={() => deleteOffer(r._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button size="small" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <Card
            title="Admin Offers"
            extra={
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setOpen(true);
                        setEditingOffer(null);
                        form.resetFields();
                    }}
                >
                    New Offer
                </Button>
            }
        >
            <Table rowKey="_id" columns={columns} dataSource={offers} loading={loading} />

            {/* 🔥 MODAL */}
            <Modal
                open={open}
                title={editingOffer ? "Edit Offer" : "Create Offer"}
                onCancel={() => setOpen(false)}
                onOk={() => form.submit()}
                okText="Save"
            >
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="discountType" label="Discount Type" initialValue="PERCENT">
                        <Select>
                            <Option value="PERCENT">Percentage</Option>
                            <Option value="FLAT">Flat</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="discount" label="Discount" rules={[{ required: true }]}>
                        <InputNumber className="w-full" />
                    </Form.Item>

                    <Form.Item name="validTill" label="Valid Till">
                        <DatePicker className="w-full" />
                    </Form.Item>

                    <Form.Item name="image" label="Offer Image">
                        <Upload beforeUpload={() => false} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default AdminOffers;
