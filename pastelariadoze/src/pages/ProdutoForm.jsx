import { Box, Button, TextField, Typography, Paper } from "@mui/material"
import { useForm } from "react-hook-form"
import { useState } from "react"
//Matheus Bairros Silva
function ProdutoForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [preco, setPreco] = useState('')

  const onSubmit = (data) => {
    console.log('Produto:', data)
    alert('Produto cadastrado!')
  }

  function formatPreco(value) {
    value = value.replace(/\D/g, '') 
    value = (Number(value) / 100).toFixed(2) 
    return value.replace('.', ',')
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
          Cadastro de Produto
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Nome do Produto"
            fullWidth
            margin="normal"
            {...register('nome', { required: 'Nome obrigatório', maxLength: 100 })}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
          <TextField
            label="Preço"
            fullWidth
            margin="normal"
            value={preco}
            onChange={(e) => {
              const formatted = formatPreco(e.target.value)
              setPreco(formatted)
              setValue('preco', formatted)
            }}
            placeholder="0,00"
            error={!!errors.preco}
            helperText={errors.preco?.message}
            inputProps={{ maxLength: 10 }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}>
            Cadastrar
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default ProdutoForm
