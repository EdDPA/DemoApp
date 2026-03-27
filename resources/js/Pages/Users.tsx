import { router } from "@inertiajs/react";
import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import DataTable, { Column } from "../Components/DataTable";
import { usePage } from "@inertiajs/react";
import {User} from "../types/index";
import { Box, Button, Container } from "@mui/material";
import SectionHeader from "../Components/SectionHeader";

type PageProps = {
  users: User[];
};

export default function Users() {
    const { users } = usePage<PageProps>().props;
    const columns: Column<User>[] = [
    { field: "name", headerName: "Nombre" },
    { field: "email", headerName: "Correo" },
    ];
    const [search, setSearch] = useState("");
    
    const onCreateUser = () => {
    router.visit("/users/create");
    };

    return (
        <MainLayout>
             <SectionHeader
                title="Usuarios"
                search={search}
                onSearchChange={setSearch}
                onCreate={onCreateUser}
                createLabel="Nuevo Usuario"
            />
            
            <DataTable
            columns={columns}
            rows={users}
            onEdit={(row) => console.log("Editar vendedor", row)}
            onDelete={(row) => console.log("Eliminar vendedor", row)}
            />;
        </MainLayout>
    );
}