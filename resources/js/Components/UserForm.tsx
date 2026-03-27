import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Stack,
} from "@mui/material";

export type UserFormValues = {
  name: string;
  email: string;
};

interface UserFormProps {
  defaultValues?: UserFormValues;
  onSubmit: (data: UserFormValues) => void;
  loading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  defaultValues,
  onSubmit,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues,
  });

  const submit: SubmitHandler<UserFormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submit)}>
      <Stack spacing={2}>
        <TextField
          label="Nombre"
          {...register("name", { required: "El nombre es obligatorio" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />

        <TextField
          label="Correo"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Correo inválido",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          Guardar
        </Button>
      </Stack>
    </Box>
  );
};

export default UserForm;