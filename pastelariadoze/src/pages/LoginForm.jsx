import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, Paper, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
//Matheus Bairros Silva
const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    const { username, password } = data;
    login(username, password);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '50vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#E3F2FD', 
        p: 2 
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 3 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}
        >
          Login
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Usuário"
            fullWidth
            margin="normal"
            {...register('username', { required: 'Usuário é obrigatório' })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register('password', { 
              required: 'Senha é obrigatória', 
              minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
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
            sx={{ 
              mt: 3, 
              py: 1.5, 
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Entrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
