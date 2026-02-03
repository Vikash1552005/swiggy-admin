import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const COLORS = ["#2563eb"];

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then(res => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setProducts(data);
      })
      .catch(err => console.log(err));
  }, []);

  // ===== TOTAL PRODUCTS =====
  const totalProducts = products.length;

  // ===== DAILY PRODUCTS =====
  const dailyMap = {};
  products.forEach(p => {
    if (!p.createdAt) return;
    const day = new Date(p.createdAt).toLocaleDateString("en-US", {
      weekday: "short",
    });
    dailyMap[day] = (dailyMap[day] || 0) + 1;
  });

  const dailyData = Object.keys(dailyMap).map(day => ({
    name: day,
    products: dailyMap[day],
  }));

  // ===== REVENUE =====
  const revenueData = products.map(p => ({
    name: p.title?.slice(0, 6) || "Item",
    revenue: p.price || 0,
  }));

  // ===== PIE DATA (Simple Count) =====
  const pieData = [{ name: "Products", value: totalProducts }];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* SUMMARY CARD */}
      <div className="bg-white p-4 rounded shadow mb-6 w-60">
        <p>Total Products</p>
        <h2 className="text-3xl font-bold">{totalProducts}</h2>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* PIE */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="mb-2 font-semibold">Products Count</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={70}
                fill={COLORS[0]}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="mb-2 font-semibold">Daily Products</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="products" stroke="#16a34a" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="mb-2 font-semibold">Product Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#9333ea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
