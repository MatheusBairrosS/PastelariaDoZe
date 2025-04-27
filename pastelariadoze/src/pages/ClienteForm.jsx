import { Box, Button, TextField, Typography, Paper } from "@mui/material"
import { useForm } from "react-hook-form"
import { useState } from "react"
//Matheus Bairros Silva
function ClienteForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [telefone, setTelefone] = useState('')

  function formatTelefone(value) {
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    return value.slice(0, 15)
  }

  const onSubmit = (data) => {
    console.log('Cliente:', data)
    alert('Cliente cadastrado!')
  }

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
          Cadastro de Cliente
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            {...register('nome', { required: 'Nome obrigatório', maxLength: 100 })}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
          <TextField
            label="Telefone"
            fullWidth
            margin="normal"
            value={telefone}
            onChange={(e) => {
              const value = formatTelefone(e.target.value)
              setTelefone(value)
              setValue('telefone', value)
            }}
            placeholder="(00) 00000-0000"
            inputProps={{ maxLength: 15 }}
            error={!!errors.telefone}
            helperText={errors.telefone?.message}
          />
          <TextField
            label="E-mail"
            fullWidth
            margin="normal"
            {...register('email', { required: 'E-mail obrigatório', maxLength: 100 })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}>
            Cadastrar
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default ClienteForm
