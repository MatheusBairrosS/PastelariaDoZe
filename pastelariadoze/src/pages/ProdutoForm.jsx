import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Componente simples para formatar preço com máscara
function PriceInput({ value, onChange, ...rest }) {
  // Mantém o valor formatado para mostrar
  const formatPrice = (val) => {
    if (!val) return '';
    // Remove tudo que não é número
    const onlyNums = val.replace(/\D/g, '');
    const number = Number(onlyNums);
    if (isNaN(number)) return '';
    // Divide por 100 para simular centavos
    const formatted = (number / 100).toFixed(2).replace('.', ',');
    return formatted;
  };

  const handleChange = (e) => {
    const val = e.target.value;
    const formatted = formatPrice(val);
    onChange(formatted);
  };

  return (
    <TextField
      {...rest}
      value={value || ''}
      onChange={handleChange}
      placeholder="0,00"
      inputProps={{ maxLength: 10 }}
    />
  );
}

const ProdutoForm = ({ title = 'Cadastro de Produto', isReadOnly = false }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      nome: '',
      preco: '',
      descricao: '',
      foto: '',
      categoria: '',
      quantidade_em_estoque: '',
      ativo: true,
    }
  });
  const [preco, setPreco] = useState('');

  const onSubmit = (data) => {
    console.log('Produto cadastrado:', data);
    alert('Produto cadastrado!');
    navigate('/produtos'); // Ajuste a rota conforme sua app
  };

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
                rules={{ required: 'Nome do Produto é obrigatório', maxLength: 100 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="Nome do Produto"
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
                name="preco"
                control={control}
                rules={{ required: 'Preço é obrigatório' }}
                render={({ field }) => (
                  <PriceInput
                    {...field}
                    disabled={isReadOnly}
                    label="Preço"
                    error={!!errors.preco}
                    helperText={errors.preco?.message}
                    size="medium"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="categoria"
                control={control}
                rules={{ required: 'Categoria é obrigatória' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="Categoria"
                    fullWidth
                    error={!!errors.categoria}
                    helperText={errors.categoria?.message}
                    size="medium"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="descricao"
                control={control}
                rules={{ required: 'Descrição obrigatória' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="Descrição"
                    multiline
                    rows={2}
                    fullWidth
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
                    size="medium"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="foto"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="Foto (URL)"
                    fullWidth
                    error={!!errors.foto}
                    helperText={errors.foto?.message}
                    size="medium"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="quantidade_em_estoque"
                control={control}
                rules={{
                  required: 'Quantidade é obrigatória',
                  min: { value: 0, message: 'Valor inválido' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="Quantidade em Estoque"
                    type="number"
                    fullWidth
                    error={!!errors.quantidade_em_estoque}
                    helperText={errors.quantidade_em_estoque?.message}
                    size="medium"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <Controller
                name="ativo"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} disabled={isReadOnly} />}
                    label="Produto Ativo"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                onClick={() => navigate('/produtos')}
                variant="outlined"
                color="primary"
                size="medium"
              >
                Cancelar
              </Button>
              {!isReadOnly && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="medium"
                  sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                >
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

export default ProdutoForm;
