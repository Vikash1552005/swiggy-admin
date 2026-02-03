import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Select, Spin, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [removedImages, setRemovedImages] = useState([]); // Track deleted old images

    // ===== FETCH PRODUCT =====
    const fetchProduct = async () => {
        try {
            setFetching(true);
            const { data } = await axios.get(`http://localhost:5000/api/products/admin/${id}`);
            if (!data.product) {
                message.error("Product not found");
                navigate("/admin/AdminProducts");
                return;
            }

            form.setFieldsValue({
                title: data.product.title,
                price: data.product.price,
                stock: data.product.stock,
                category: data.product.category,
                description: data.product.description,
                discount: data.product.discount,
                discountType: data.product.discountType?.toLowerCase(),
            });

            // Set existing images
            if (data.product.images) {
                setFileList(
                    data.product.images.map((img) => ({
                        uid: img.public_id,
                        name: img.url.split("/").pop(),
                        status: "done",
                        url: img.url,
                    }))
                );
            }
        } catch (error) {
            console.error(error);
            message.error("Failed to load product");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    // ===== UPDATE PRODUCT =====
    const onFinish = async (values) => {
        setLoading(true);
        try {
            if (fileList.length === 0) {
                message.error("At least one image is required");
                setLoading(false);
                return;
            }

            const formData = new FormData();

            // Append all fields
            Object.keys(values).forEach((key) => {
                if (values[key] !== undefined) formData.append(key, values[key]);
            });

            // Append new files only
            fileList.forEach((file) => {
                if (file.originFileObj) formData.append("images", file.originFileObj);
            });

            // Append removed old images for backend deletion
            if (removedImages.length > 0) {
                formData.append("removedImages", JSON.stringify(removedImages));
            }

            await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            message.success("Product updated successfully");
            navigate("/admin/AdminProducts");
        } catch (error) {
            console.error(error);
            message.error("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="text-center mt-20">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Form form={form} layout="vertical" onFinish={onFinish} disabled={loading}>
            <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter the product title" }]}>
                <Input placeholder="Enter product title" />
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Input.TextArea rows={4} placeholder="Enter product description" />
            </Form.Item>

            <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please enter the price" }]}>
                <InputNumber min={0} placeholder="Enter price" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Stock" name="stock">
                <InputNumber min={0} placeholder="Enter stock quantity" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please enter the category" }]}>
                <Input placeholder="Enter category" />
            </Form.Item>

            <Form.Item label="Discount Type" name="discountType">
                <Select placeholder="Select discount type">
                    <Option value="percentage">Percent</Option>
                    <Option value="flat">Flat</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Discount Value" name="discount">
                <InputNumber min={0} placeholder="Enter discount value" style={{ width: "100%" }} />
            </Form.Item>

            {/* ===== UPLOAD IMAGES WITH DELETE OPTION ===== */}
            <Form.Item label="Upload Images" valuePropName="fileList">
                <Upload
                    listType="picture"
                    fileList={fileList}
                    onChange={({ fileList }) => setFileList(fileList)}
                    onRemove={(file) => {
                        // Track removed old images for permanent delete
                        if (file.url) setRemovedImages((prev) => [...prev, file.uid]);
                    }}
                    multiple
                    accept="image/*"
                    maxCount={5}
                >
                    <Button icon={<UploadOutlined />}>Select Images (Max 5)</Button>
                </Upload>
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} block>
                Update Product
            </Button>
        </Form>
    );
};

export default EditProduct;
