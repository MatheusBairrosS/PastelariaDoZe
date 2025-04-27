import { Box, Button, TextField, Typography, Paper, IconButton, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
//Matheus Bairros Silva
function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    if (data.usuario === 'abc' && data.senha === 'bolinhas') {
      localStorage.setItem('loginRealizado', data.usuario);
      navigate('/home');
    } else {
      alert('Usuário ou senha inválido!');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
          Bem-vindo
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Usuário Matheus Bairros Silva"
            fullWidth
            margin="normal"
            {...register('usuario', { required: 'Usuário obrigatório' })}
            error={!!errors.usuario}
            helperText={errors.usuario?.message}
          />
          <TextField
            label="Senha"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            {...register('senha', { 
              required: 'Senha obrigatória', 
              minLength: { value: 6, message: 'Mínimo 6 caracteres' } 
            })}
            error={!!errors.senha}
            helperText={errors.senha?.message}
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
}

export default LoginForm;
