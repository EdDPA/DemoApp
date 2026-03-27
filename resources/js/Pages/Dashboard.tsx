import React from "react";
import MainLayout from "../Layouts/MainLayout";
import TableComponent from "../Components/TableComponent/TableComponent";

export default function Dashboard() {
    return (
        <MainLayout>
            <h1>Dashboard</h1>
            <TableComponent/>
        </MainLayout>
    );
}