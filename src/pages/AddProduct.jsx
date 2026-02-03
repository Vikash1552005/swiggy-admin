import { message } from "antd";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔹 HANDLE INPUTS */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* 🔹 HANDLE IMAGES */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length !== 5) {
      message.error("Please select exactly 5 images");
      return;
    }
    setImages(files);
  };

  /* 🔹 IMAGE PREVIEW */
  useEffect(() => {
    if (!images.length) return;

    const urls = images.map((img) => URL.createObjectURL(img));
    setPreviews(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  /* 🔹 FORM VALIDATION (BUTTON ENABLE / DISABLE) */
  const isFormValid = useMemo(() => {
    if (!form.title.trim()) return false;
    if (!form.price || form.price <= 0) return false;
    if (!form.category.trim()) return false;
    if (form.stock < 0) return false;
    if (form.rating && (form.rating < 0 || form.rating > 5)) return false;
    if (images.length !== 5) return false;

    return true;
  }, [form, images]);

  /* 🔹 SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      images.forEach((img) => formData.append("images", img));

      await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      message.success("Product added successfully");

      /* 🔹 RESET */
      setForm({
        title: "",
        description: "",
        price: "",
        discountPercentage: "",
        rating: "",
        stock: "",
        brand: "",
        category: "",
      });
      setImages([]);
      setPreviews([]);
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border px-4 py-2 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border px-4 py-2 rounded"
          />
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border px-4 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="discountPercentage"
            value={form.discountPercentage}
            onChange={handleChange}
            placeholder="Discount %"
            className="border px-4 py-2 rounded"
          />
          <input
            type="number"
            step="0.1"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating (0–5)"
            className="border px-4 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="border px-4 py-2 rounded"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border px-4 py-2 rounded"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full border px-4 py-2 rounded"
        />

        <div>
          <label className="text-sm font-medium">Upload Exactly 5 Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block mt-2"
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          {previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="preview"
              className="w-20 h-20 object-cover border rounded"
            />
          ))}
        </div>

        {/* 🔹 BUTTON */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`px-6 py-2 rounded text-white transition
            ${
              !isFormValid || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }
          `}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
