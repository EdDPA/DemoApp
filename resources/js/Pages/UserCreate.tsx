import React from "react";
import UserForm from "../Components/UserForm";
import MainLayout from "../Layouts/MainLayout";


export default function CreateUser() {
  const handleSubmit = (data: UserFormValues) => {
    console.log("Datos enviados:", data);
    // router.post('/users', data);
  };

  return (
    <MainLayout>
        <h1>Registro de usuario</h1>
        <UserForm
            onSubmit={handleSubmit}
            />
    </MainLayout>
    
  );
}