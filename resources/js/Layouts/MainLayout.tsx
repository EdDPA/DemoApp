import { useState, useEffect, ReactNode } from "react";
import { router } from '@inertiajs/react'
import {
    Box,
    CssBaseline,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    useMediaQuery,
    Tooltip,
    Avatar,
    Menu,
    MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Components/Sidebar";
import { settings } from "cluster";
import imagePerfil from '../../../public/images/avatar1.png';
const drawerWidth = 240;

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const isMobile = useMediaQuery("(max-width:768px)");
    const [open, setOpen] = useState<boolean>(!isMobile);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const toggleDrawer = () => setOpen((prev) => !prev);
    //icon perfil
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const settings = ['Perfil', 'Logout'];
    // Persistencia
    useEffect(() => {
        const saved = localStorage.getItem("sidebar");
        if (saved !== null) setOpen(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("sidebar", JSON.stringify(open));
    }, [open]);
    //acciones en menu
    const handleMenuAction = (setting: string) => {
        handleCloseUserMenu();

        if (setting === 'Logout') {
            router.post('/logout');
        }

        if (setting === 'Perfil') {
            router.get('/perfil'); // ajusta la ruta si es diferente
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* Topbar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    transition: "0.3s",
                    ml: open ? `${drawerWidth}px` : "64px",
                    width: open
                        ? `calc(100% - ${drawerWidth}px)`
                        : `calc(100% - 64px)`
                }}
            >
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">CRM</Typography>
                    <Typography sx={{ flexGrow: 1 }} /> 
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="perfil" src={imagePerfil} />
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={() => handleMenuAction(setting)}>
                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Sidebar open={open} isMobile={isMobile} onClose={() => setOpen(false)} />

            {/* Contenido */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: open ? `${drawerWidth}px` : "64px",
                    transition: "0.3s"
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}