import {
    AppBar,
    Avatar,
    Badge,
    Box,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [orderCount, setOrderCount] = useState(0);

    const user = {
        name: "Vicky Kumar",
        role: "Super Admin",
        email: "admin@yourdomain.com",
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/admin-login";
    };

    // 🔔 Fetch new order count
   const fetchNewOrders = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(
            "http://localhost:5000/api/orders/admin/new-count",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (data.success) {
            setOrderCount(data.count);
        }
    } catch (error) {
        console.error("Notification error:", error.response?.data || error.message);
    }
};


    // 🔄 Auto refresh every 10 sec
    useEffect(() => {
        fetchNewOrders();

        const interval = setInterval(fetchNewOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar className="flex justify-between">
                {/* Left */}
                <Typography variant="h6" fontWeight={600}>
                    Admin Panel
                </Typography>

                {/* Search */}
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                        backgroundColor: "#f3f4f6",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        width: 320,
                    }}
                >
                    <Search size={18} />
                    <InputBase
                        placeholder="Search..."
                        sx={{ ml: 1, flex: 1, fontSize: 14 }}
                    />
                </Box>

                {/* Right */}
                <Box className="flex items-center gap-4">
                    {/* 🔔 Notification */}
                    <IconButton>
                        <Badge badgeContent={orderCount} color="error">
                            <Bell size={22} />
                        </Badge>
                    </IconButton>

                    {/* Profile */}
                    <IconButton onClick={handleOpenMenu}>
                        <Avatar sx={{ bgcolor: "#e5e7eb", color: "#374151" }}>
                            {user.name.charAt(0)}
                        </Avatar>
                    </IconButton>

                    {/* Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem disabled>
                            <Box>
                                <Typography fontWeight={600}>
                                    {user.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {user.role}
                                </Typography>
                            </Box>
                        </MenuItem>

                        <MenuItem>My Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
