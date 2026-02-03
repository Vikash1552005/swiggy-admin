import { message, Spin } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCarousel = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [order, setOrder] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const [btnLoading, setBtnLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        if (!title || !image) {
            return message.warning("Title and image are required");
        }

        try {
            setBtnLoading(true);

            const formData = new FormData();
            formData.append("title", title);
            formData.append("image", image);
            formData.append("order", order);
            formData.append("isActive", isActive);

            await axios.post(
                "http://localhost:5000/api/carousel",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
              
            );

message.success("Carousel created successfully");
navigate("/admin/carousel");
        } catch (error) {
    console.error(error);
    message.error("Failed to create carousel");
} finally {
    setBtnLoading(false);
}
    };

return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <form
            onSubmit={submit}
            className="bg-white w-full max-w-xl rounded-2xl shadow-md border p-6 space-y-6"
        >
            {/* Header */}
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-slate-800">
                    Add Carousel
                </h2>
                <p className="text-sm text-slate-500">
                    Create a new homepage banner
                </p>
            </div>

            {/* Image Preview */}
            {preview && (
                <div className="flex justify-center">
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-40 rounded-xl border object-cover"
                    />
                </div>
            )}

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                    Title
                </label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Carousel title"
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                />
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1 focus:ring-2 focus:ring-blue-500">
                    Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    className="focus:ring-2 focus:ring-blue-500 cursor-pointer w-full text-sm px-4 border rounded-lg py-2"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setImage(file);
                            setPreview(URL.createObjectURL(file));
                        }
                    }}
                    required
                />
            </div>

            {/* Order */}
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                    Order
                </label>
                <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
                <span className="text-slate-700">Active</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={btnLoading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center"
                >
                    {btnLoading ? <Spin size="small" /> : "Create"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/admin/carousel")}
                    disabled={btnLoading}
                    className="flex-1 border border-slate-300 text-slate-700 py-2 rounded-lg hover:bg-slate-100 transition"
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
);
};

export default AddCarousel;
