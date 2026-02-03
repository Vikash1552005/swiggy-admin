// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaIndianRupeeSign } from "react-icons/fa6";
// import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fetch products from backend API
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/products"
//       );
//       setProducts(res.data.products); // 👈 API response
//     } catch (error) {
//       console.error("Error fetching products", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // 🔹 Delete product (frontend demo)
//   const handleDelete = (id) => {
//     if (window.confirm("Delete this product?")) {
//       setProducts(products.filter((p) => p._id !== id));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         Loading products...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow p-6">

//       {/* 🔝 Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Products</h2>

//         <input
//           type="text"
//           placeholder="Search product..."
//           className="border px-4 py-2 rounded-lg w-64"
//         />
//       </div>

//       {/* 📊 Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="border-b bg-gray-50 text-sm text-gray-600">
//               <th className="p-3">Product</th>
//               <th className="p-3">Category</th>
//               <th className="p-3">Price (₹)</th>
//               <th className="p-3">Stock</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id} className="border-b hover:bg-gray-50">

//                 <td className="p-3 flex items-center gap-3">
//                   <img
//                     src={product.thumbnail}
//                     alt={product.title}
//                     className="w-12 h-12 rounded border"
//                   />
//                   <span className="font-medium">
//                     {product.title}
//                   </span>
//                 </td>

//                 <td className="p-3">{product.category}</td>
//                 <td className="p-3 flex items-center gap-1">
//                   <FaIndianRupeeSign className="text-sm" />
//                   <span>{product.price}</span>
//                 </td>
//                 <td className="p-3">{product.stock}</td>

//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 0
//                       ? "bg-green-100 text-green-600"
//                       : "bg-red-100 text-red-600"
//                       }`}
//                   >
//                     {product.stock > 0 ? "Active" : "Out of Stock"}
//                   </span>
//                 </td>

//                 <td className="p-3 text-center">
//                   <div className="flex justify-center gap-3">
//                     <button className="text-blue-500 hover:text-blue-700">
//                       <RiEdit2Line size={18} />
//                     </button>

//                     <button
//                       onClick={() => handleDelete(product._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <RiDeleteBin5Line size={18} />
//                     </button>
//                   </div>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 📦 Empty State */}
//       {products.length === 0 && (
//         <p className="text-center text-gray-500 py-10">
//           No products found
//         </p>
//       )}
//     </div>
//   );
// };

// export default Products;
