import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, Grid, InputAdornment, IconButton,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import IMaskInputWrapper from '../components/IMaskInputWrapper'; // seu componente de máscara
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ClienteForm = ({ title = "Cadastro de Cliente", isReadOnly = false }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log('Cliente cadastrado:', data);
    alert('Cliente cadastrado!');
    navigate('/clientes'); // Ajuste para a rota correta
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 480,
          width: '100%',
          borderRadius: 3,
          backgroundColor: '#f0f4f8',
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          color="primary"
          align="center"
          gutterBottom
          sx={{ mb: 3 }}
        >
          {title}
        </Typography>

        {isReadOnly && (
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Todos os campos estão em modo somente leitura.
          </Typography>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="nome"
                control={control}
                defaultValue=""
                rules={{ required: "Nome é obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="Nome"
                    fullWidth
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                    size="medium"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="cpf"
                control={control}
                defaultValue=""
                rules={{ required: "CPF é obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="CPF"
                    fullWidth
                    error={!!errors.cpf}
                    helperText={errors.cpf?.message}
                    size="medium"
                    InputProps={{
                      inputComponent: IMaskInputWrapper,
                      inputProps: {
                        mask: "000.000.000-00",
                        definitions: { "0": /\d/ },
                        unmask: true,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="telefone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="Telefone"
                    fullWidth
                    error={!!errors.telefone}
                    helperText={errors.telefone?.message}
                    size="medium"
                    InputProps={{
                      inputComponent: IMaskInputWrapper,
                      inputProps: {
                        mask: "(00) 00000-0000",
                        definitions: { "0": /\d/ },
                        unmask: true,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            {/* Exemplo se quiser adicionar senha no cliente */}
            {/* <Grid item xs={12}>
              <Controller
                name="senha"
                control={control}
                defaultValue=""
                rules={{
                  required: !isReadOnly ? "Senha obrigatória" : false,
                  minLength: !isReadOnly ? { value: 6, message: "Pelo menos 6 caracteres" } : undefined,
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    error={!!errors.senha}
                    helperText={errors.senha?.message || (!isReadOnly ? "Deixe em branco para gerar automática" : '')}
                    size="medium"
                    InputProps={{
                      endAdornment: !isReadOnly && (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid> */}

            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button onClick={() => navigate('/clientes')} variant="outlined" color="primary" size="medium">
                Cancelar
              </Button>
              {!isReadOnly && (
                <Button type="submit" variant="contained" color="primary" size="medium" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  Cadastrar
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ClienteForm;
