import {
    MdAccountBalance,
    MdAddBox,
    MdDashboard,
    MdHelpOutline,
    MdListAlt,
    MdLogout,
    MdPeople,
    MdShoppingCart,
    MdStore,
    MdSupportAgent,
} from "react-icons/md";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

/* 🎨 Menu Style */
const menuClass = (isActive) =>
    `flex items-center gap-3 px-4 py-3 mb-[5px] rounded-lg font-medium transition-all
    ${
        isActive
            ? "bg-orange-50 text-orange-600  border-l-4 border-orange-500"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

const Section = ({ title }) => (
    <p className="px-4 pt-5 pb-2 text-xs font-semibold text-gray-400 uppercase">
        {title}
    </p>
);

const Sidebar = () => {
    const role = localStorage.getItem("role") || "";

    const isSuperAdmin = role === "super_admin";
    const isProductAdmin = ["super_admin", "product_manager_admin"].includes(role);
    const isOrderAdmin = ["super_admin", "order_manager_admin"].includes(role);
    const isCustomerCare = ["super_admin", "customer_care_admin"].includes(role);
    const isSellerAdmin = ["super_admin", "seller_admin"].includes(role);
    const isAccountsAdmin = ["super_admin", "accounts_admin"].includes(role);

    return (
        <aside className="w-64 h-screen mb-6 bg-white border-r shadow-sm flex flex-col sticky top-0 z-50">

            {/* 🔥 Logo */}
            <div className="px-6 py-6 border-b">
                <h1 className="text-2xl font-extrabold text-orange-500">
                    Swiggy Admin
                </h1>
                <p className="text-xs text-gray-400 capitalize">
                    {role.replaceAll("_", " ")}
                </p>
            </div>

            {/* 📌 MENU */}
            <nav className="flex-1 overflow-y-auto">

                {/* MAIN */}
                <Section title="Main" />
                <NavLink to="/admin/dashboard">
                    {({ isActive }) => (
                        <div className={menuClass(isActive)}>
                            <MdDashboard size={22} />
                            Dashboard
                        </div>
                    )}
                </NavLink>

                {/* USER MANAGEMENT */}
                {isSuperAdmin && (
                    <>
                        <Section title="User Management" />
                        <NavLink to="/admin/users">
                            {({ isActive }) => (
                                <div className={menuClass(isActive)}>
                                    <MdPeople size={22} />
                                    Users
                                </div>
                            )}
                        </NavLink>

                        <NavLink to="/admin/all_admin-users">
                            {({ isActive }) => (
                                <div className={menuClass(isActive)}>
                                    <MdPeople size={22} />
                                    Admin Users
                                </div>
                            )}
                        </NavLink>

                        <NavLink to="/admin/offers">
                            {({ isActive }) => (
                                <div className={menuClass(isActive)}>
                                    <MdPeople size={22} />
                                    AdminOffers
                                </div>
                            )}
                        </NavLink>
                    </>
                    
                )}

                {/* CATALOG */}
                {isProductAdmin && (
                    <>
                        <Section title="Catalog" />
                        <NavLink to="/admin/add-product">
                            {({ isActive }) => (
                                <div className={menuClass(isActive)}>
                                    <MdAddBox size={22} />
                                    Add Product
                                </div>
                            )}
                        </NavLink>

                        {/* <NavLink to="/admin/products">
                            {({ isActive }) => (
                                <div className={menuClass(isActive)}>
                                    <MdListAlt size={22} />
                                    Products
                                </div>
                            )}
                        </NavLink> */}

                         <NavLink to="/admin/products/edit/:id">
                            {({ isActive }) => (
                                <div className={menuClass(isActive)}>
                                    <MdListAlt size={22} />
                                    Products
                                </div>
                            )}
                        </NavLink>
                                <NavLink to="/admin/AdminProducts">
                            {({ isActive }) => (
                                <div className={menuClass(isActive)}>
                                    <MdListAlt size={22} />
                                    AdminProducts
                                </div>
                            )}
                        </NavLink>
                                                

                    </>
                )}

                {/* OPERATIONS */}
                {(isOrderAdmin || isCustomerCare) && (
                    <>
                        <Section title="Operations" />
                        {isOrderAdmin && (
                            <NavLink to="/admin/AdminOrders">
                                {({ isActive }) => (
                                    <div className={menuClass(isActive)}>
                                        <MdShoppingCart size={22} />
                                        Orders
                                    </div>
                                )}
                            </NavLink>
                        )}

                        {isCustomerCare && (
                            <NavLink to="/admin/support">
                                {({ isActive }) => (
                                    <div className={menuClass(isActive)}>
                                        <MdSupportAgent size={22} />
                                        Customer Care
                                    </div>
                                )}
                            </NavLink>
                        )}
                    </>
                )}

                {/* BUSINESS */}
                {(isSellerAdmin || isAccountsAdmin) && (
                    <>
                        <Section title="Business" />

                        {isSellerAdmin && (
                            <NavLink to="/admin/sellers">
                                {({ isActive }) => (
                                    <div className={menuClass(isActive)}>
                                        <MdStore size={22} />
                                        Sellers
                                    </div>
                                )}
                            </NavLink>
                        )}

                        {isAccountsAdmin && (
                            <>
                                <NavLink to="/admin/accounts">
                                    {({ isActive }) => (
                                        <div className={menuClass(isActive)}>
                                            <MdAccountBalance size={22} />
                                            Accounts
                                        </div>
                                    )}
                                </NavLink>

                                <NavLink to="/admin/carousel">
                                    {({ isActive }) => (
                                        <div className={menuClass(isActive)}>
                                            <MdListAlt size={22} />
                                            Carousel
                                        </div>
                                    )}
                                </NavLink>

                                <NavLink to="/admin/carousel/add">
                                    {({ isActive }) => (
                                        <div className={menuClass(isActive)}>
                                            <MdAddBox size={22} />
                                            Add Carousel
                                        </div>
                                    )}
                                </NavLink>
                            </>
                        )}
                    </>
                )}

                {/* HELP */}
                <Section title="Support" />
                <NavLink to="/admin/help">
                    {({ isActive }) => (
                        <div className={menuClass(isActive) }>
                            <MdHelpOutline size={22} />
                            Help & Support
                        </div>
                    )}
                </NavLink>
            </nav>

            {/* 🌐 FOOTER */}
            <div className="px-6 py-4 pb-20 border-t space-y-4">
                <div className="flex justify-between text-gray-400">
                    <FaFacebookF size={20} />
                    <FaInstagram size={20} />
                    <FaTwitter size={20} />
                    <FaLinkedinIn size={20} />
                </div>

                <button
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/admin/login";
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-medium rounded-lg hover:bg-red-50 transition"
                >
                    <MdLogout size={22} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
