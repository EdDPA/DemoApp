import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import axios from 'axios';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        post("/login", {
            onSuccess: () => {
                console.log("Login exitoso");
            }
        });
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1e3c72, #2a5298)"
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    width: 400,
                    borderRadius: 3
                }}
            >
                <Typography variant="h5" mb={2} fontWeight="bold">
                    Iniciar sesión
                </Typography>
                
               
                <form onSubmit={handleSubmit}>
                    {Object.keys(errors).length > 0 && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {Object.values(errors).map((error, i) => (
                                <div key={i}>{error}</div>
                            ))}
                        </Alert>
                    )}
                    <TextField
                        label="Correo electrónico"
                        fullWidth
                        margin="normal"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, py: 1.5 }}
                        disabled={processing}
                    >
                        {processing ? "Ingresando..." : "Ingresar"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}