import { message, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CarouselList = () => {
    const [carousels, setCarousels] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchCarousels = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/carousel/admin",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setCarousels(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            message.error("Failed to load carousels");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarousels();
    }, []);

    const toggleStatus = async (id, status) => {
        setLoading(true);
        try {
            await axios.put(
                `http://localhost:5000/api/carousel/${id}`,
                { isActive: !status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            message.success(
                `Carousel ${status ? "deactivated" : "activated"}`
            );
            fetchCarousels();
        } catch (error) {
            console.error(error);
            message.error("Failed to update status");
            setLoading(false);
        }
    };

    const deleteCarousel = async (id) => {
        if (!window.confirm("Delete carousel?")) return;

        setLoading(true);
        try {
            await axios.delete(`http://localhost:5000/api/carousel/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            message.success("Carousel deleted successfully");
            fetchCarousels();
        } catch (error) {
            console.error(error);
            message.error("Failed to delete carousel");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 p-8 relative">
            {/* Loader Overlay */}
            {loading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-50">
                    <Spin size="large" />
                </div>
            )}

            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-800">
                            Carousel Management
                        </h2>
                        <p className="text-sm text-slate-500">
                            Manage homepage carousel banners
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/admin/carousel/add")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                        + Add Carousel
                    </button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-slate-500 bg-slate-50 border-b">
                    <div className="col-span-3">Image</div>
                    <div className="col-span-3">Title</div>
                    <div className="col-span-2">Order</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                {/* Empty State */}
                {carousels.length === 0 && !loading && (
                    <div className="py-12 text-center text-slate-500">
                        No carousel items found
                    </div>
                )}

                {/* Rows */}
                <div className="divide-y">
                    {carousels.map((item) => (
                        <div
                            key={item._id}
                            className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition"
                        >
                            {/* Image */}
                            <div className="col-span-3">
                                <img
                                    src={item.image?.url}
                                    alt={item.title}
                                    className="w-40 h-24 object-cover rounded-lg border"
                                />
                            </div>

                            {/* Title */}
                            <div className="col-span-3 font-medium text-slate-800">
                                {item.title}
                            </div>

                            {/* Order */}
                            <div className="col-span-2 text-slate-600">
                                {item.order}
                            </div>

                            {/* Status */}
                            <div className="col-span-2">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${item.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {item.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="col-span-2 flex justify-end gap-2">
                                <button
                                    onClick={() =>
                                        toggleStatus(item._id, item.isActive)
                                    }
                                    className={`px-3 py-1.5 text-xs rounded-md font-medium ${item.isActive
                                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                            : "bg-green-100 text-green-700 hover:bg-green-200"
                                        }`}
                                >
                                    {item.isActive ? "Deactivate" : "Activate"}
                                </button>

                                <button
                                    onClick={() =>
                                        navigate(`/admin/carousel/edit/${item._id}`)
                                    }
                                    className="px-3 py-1.5 text-xs rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteCarousel(item._id)}
                                    className="px-3 py-1.5 text-xs rounded-md bg-red-100 text-red-600 hover:bg-red-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarouselList;
