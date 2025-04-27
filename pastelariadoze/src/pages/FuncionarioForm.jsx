import { TextField, Button, Box, Typography, Paper, IconButton, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material";
//Matheus Bairros Silva
function FuncionarioForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')

  function formatCpf(value) {
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    return value.slice(0, 14)
  }

  function formatTelefone(value) {
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    return value.slice(0, 15)
  }

  const onSubmit = (data) => {
    console.log('Funcionário:', data)
    alert('Funcionário cadastrado!')
  }

  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          Cadastro de Funcionário
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          
          <TextField
            label="Matrícula"
            fullWidth
            margin="normal"
            {...register('matricula', { required: 'Matrícula obrigatória' })}
            error={!!errors.matricula}
            helperText={errors.matricula?.message}
          />

          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            {...register('nome', { required: 'Nome obrigatório', maxLength: 100 })}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />

          <TextField
            label="CPF"
            fullWidth
            margin="normal"
            value={cpf}
            onChange={(e) => {
              const value = formatCpf(e.target.value);
              setCpf(value);
              setValue('cpf', value);
            }}
            placeholder="000.000.000-00"
            inputProps={{ maxLength: 14 }}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
          />

          <TextField
            label="Telefone"
            fullWidth
            margin="normal"
            value={telefone}
            onChange={(e) => {
              const value = formatTelefone(e.target.value);
              setTelefone(value);
              setValue('telefone', value);
            }}
            placeholder="(00) 00000-0000"
            inputProps={{ maxLength: 15 }}
            error={!!errors.telefone}
            helperText={errors.telefone?.message}
          />

          <TextField
            label="Grupo"
            fullWidth
            margin="normal"
            type="number"
            {...register('grupo', { required: 'Grupo obrigatório' })}
            error={!!errors.grupo}
            helperText={errors.grupo?.message}
          />

          <TextField
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            {...register('password', { 
              required: 'Senha é obrigatória', 
              minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' }
            })}
            error={!!errors.password}
            helperText={errors.password?.message || 'Deixe em branco para gerar automática'}
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
            sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
          >
            Cadastrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default FuncionarioForm
