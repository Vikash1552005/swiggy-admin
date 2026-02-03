import { message, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCarousel = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [order, setOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const [pageLoading, setPageLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);

    // ================= FETCH DATA =================
    useEffect(() => {
        const fetchCarousel = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/carousel/admin",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                const carousel = data.find((item) => item._id === id);

                if (!carousel) {
                    message.error("Carousel not found");
                    return navigate("/admin/carousel");
                }

                setTitle(carousel.title);
                setOrder(carousel.order);
                setIsActive(carousel.isActive);
                setPreview(carousel.image?.url || "");
            } catch (error) {
                console.error(error);
                message.error("Failed to load carousel");
            } finally {
                setPageLoading(false);
            }
        };

        fetchCarousel();
    }, [id, navigate]);

    // ================= UPDATE =================
    const submit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("order", order);
            formData.append("isActive", isActive);
            if (image) formData.append("image", image);

            await axios.put(
                `http://localhost:5000/api/carousel/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            message.success("Carousel updated successfully");
            navigate("/admin/carousel");
        } catch (error) {
            console.error(error);
            message.error("Failed to update carousel");
        } finally {
            setBtnLoading(false);
        }
    };

    // ================= PAGE LOADER =================
    if (pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    // ================= UI =================
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={submit}
                className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Edit Carousel
                </h2>

                {/* Image Preview */}
                {preview && (
                    <div className="flex justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-40 rounded-lg border object-cover"
                        />
                    </div>
                )}

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Title
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Change Image (optional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setImage(file);
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                        className="w-full text-sm"
                    />
                </div>

                {/* Order */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Order
                    </label>
                    <input
                        type="number"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Active */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-gray-700">Active</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={btnLoading}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                    >
                        {btnLoading ? "Updating..." : "Update"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/carousel")}
                        disabled={btnLoading}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCarousel;
