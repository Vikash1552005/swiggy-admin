import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Main = () => {
    return (
        <div className="h-screen flex flex-col overflow-hidden">

            {/* 🔝 Sticky Navbar */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            {/* 🔽 Sidebar + Content */}
            <div className="flex flex-1 overflow-hidden">

                {/* 🧭 Sticky Sidebar */}
                <aside className="sticky top-0  h-[calc(100vh-4rem)]">
                    <Sidebar />
                </aside>

                {/* 📄 Scrollable Page Content */}
                <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default Main;
