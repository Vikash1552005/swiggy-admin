import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./layouts/Main";
import Accounts from "./pages/Accounts";
import AddProduct from "./pages/AddProduct";
import AddCarousel from "./pages/admin/carousel/AddCarousel";
import CarouselList from "./pages/admin/carousel/CarouselList";
import EditCarousel from "./pages/admin/carousel/EditCarousel";
import AdminOffers from "./pages/admin/offers/AdminOffers";
import AdminProducts from "./pages/admin/products/AdminProducts";
import EditProduct from "./pages/admin/products/EditProduct";
import AllAdminUsers from "./pages/AllAdminUsers";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Sellers from "./pages/Sellers";
import Support from "./pages/Support";
import Users from "./pages/Users";
import AdminProtectedRoute from "./routes/AdminRoutes";
import AdminOrders from "./pages/admin/AdminOrders/AdminOrders";
function App() {
  return (
    <Routes>

      {/* Redirect root to admin login */}
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      {/* Public */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <Main />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        {/* <Route path="Products" element={<Products />} /> */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="all_admin-users" element={<AllAdminUsers />} />
        <Route path="help" element={<Help />} />
        <Route path="orders" element={<Orders />} />
        <Route path="support" element={<Support />} />
        <Route path="sellers" element={<Sellers />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="/admin/carousel" element={<CarouselList />} />
        <Route path="/admin/carousel/add" element={<AddCarousel />} />
        <Route path="/admin/carousel/edit/:id" element={<EditCarousel />} />
        <Route path="/admin/offers" element={<AdminOffers />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        <Route path="/admin/AdminProducts" element={<AdminProducts />} />
        <Route path="/admin/AdminOrders" element={<AdminOrders />} />





      </Route>

    </Routes>
  );
}

export default App;
