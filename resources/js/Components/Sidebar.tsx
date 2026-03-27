import {
    Collapse,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem as MuiMenuItem,
    Tooltip
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/HomeOutlined';
import PeopleIcon from "@mui/icons-material/Person2Outlined";
import SolicitudIcon from '@mui/icons-material/InventoryOutlined';
import PedidosIcon from '@mui/icons-material/PriceCheckOutlined';
import { ReactNode, useState } from "react";
import { router } from "@inertiajs/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const drawerWidth = 240;

interface SidebarProps {
    open: boolean;
    isMobile: boolean;
    onClose: () => void;
}

interface MenuItem {
    name: string;
    icon?: ReactNode;
    route?: string;
    children?: MenuItem[];
}

const menu: MenuItem[] = [
    { name: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    { name: "Usuarios", icon: <PeopleIcon />, route: "/users" },
    { name: "Solicitudes", icon: <SolicitudIcon />, route: "/users" },
    {
        name: "Pedidos",
        icon: <PedidosIcon />,
        children: [
            { name: "Ver solicitudes", route: "/orders" },
            { name: "Pendientes", route: "/orders/pending" }
        ]
    }
];

export default function Sidebar({ open, isMobile, onClose }: SidebarProps) {
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeMenu, setActiveMenu] = useState<MenuItem | null>(null);
    //click en menu
    const handleToggle = (name: string) => {
        setOpenMenus((prev) => ({
            ...prev,
            [name]: !prev[name]
        }));
    };
    //metodo para click en submenu
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, item: MenuItem) => {
        if (item.children) {
            if (open) {
                handleToggle(item.name);
            } else {
                setAnchorEl(event.currentTarget);
                setActiveMenu(item);
            }
        } else if (item.route) {
            router.visit(item.route);
        }
    };
    return (
       <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={open}
            onClose={onClose}
            sx={{
                width: open ? drawerWidth : 64,
                "& .MuiDrawer-paper": {
                    width: open ? drawerWidth : 64,
                    transition: "0.3s",
                    overflowX: "hidden"
                }
            }}
        >
            <List>
            {menu.map((item) => (
                <>
                <ListItem key={item.name} disablePadding>
                    <Tooltip title={!open ? item.name : ""} placement="right">
                         <ListItemButton onClick={(e) => handleMenuClick(e, item)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            {open && <ListItemText primary={item.name} />}

                            {item.children && open &&
                                (openMenus[item.name] ? <ExpandLess /> : <ExpandMore />)}
                        </ListItemButton>
                    </Tooltip>
                    
                </ListItem>
                {item.children && (
                            <Collapse in={openMenus[item.name]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.children.map((sub) => (
                                        <ListItem key={sub.name} disablePadding sx={{ pl: 4 }}>
                                            <ListItemButton
                                                onClick={() => sub.route && router.visit(sub.route)}
                                            >
                                                <ListItemIcon>{sub.icon}</ListItemIcon>
                                                {open && <ListItemText primary={sub.name} />}
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                        </>
            ))}
        </List>
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
        >
            {activeMenu?.children?.map((sub) => (
                <MuiMenuItem
                    key={sub.name}
                    onClick={() => {
                        setAnchorEl(null);
                        sub.route && router.visit(sub.route);
                    }}
                >
                    {sub.icon && <ListItemIcon>{sub.icon}</ListItemIcon>}
                    {sub.name}
                </MuiMenuItem>
            ))}
        </Menu>
        </Drawer>
    );
}