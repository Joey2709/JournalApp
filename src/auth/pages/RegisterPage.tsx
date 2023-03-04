import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { emailRegex, nameRegex } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { startRegisterUserWithEmailPassword } from "../../store/auth/thunks";
import { RootState } from "../../store/store";

const formValidations = {
  email: [
    (value: string) => emailRegex.test(value),
    "El correo debe tener una",
  ],
  password: [
    (value: string) => value.length > 7,
    "La contraseña debe tener al menos 8 dígitos",
  ],
  displayName: [
    (value: string) => value.length > 1,
    "El nombre es obligatorio",
  ],
};

const RegisterPage = () => {
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(
    {
      email: "joseph@google.com",
      password: "12345678",
      displayName: "joseph",
    },
    formValidations
  );

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const dispatch = useDispatch();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    setFormSubmitted(false);
    console.log("form", formState);
    dispatch(startRegisterUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Registrar">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Joseph Chero"
              fullWidth
              name="displayName"
              autoComplete="off"
              value={displayName}
              onChange={onInputChange}
              error={!!displayName && formSubmitted}
              helperText={displayNameValid}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="@correo.com"
              fullWidth
              name="email"
              autoComplete="off"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              autoComplete="off"
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            ></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {!!errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuthentication}
              >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
