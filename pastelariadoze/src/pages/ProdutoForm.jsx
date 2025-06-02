import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Grid, TextField, Button, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions,
  FormControlLabel, Checkbox
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto
} from '../services/produtoService';

function formatPreco(valor) {
  if (!valor) return '';
  const nums = valor.toString().replace(/\D/g, '');
  const preco = (Number(nums) / 100).toFixed(2);
  return preco.replace('.', ',');
}

function parsePreco(valorFormatado) {
  return valorFormatado;
}

const ProdutoForm = () => {
  const { id, opr } = useParams();
  const navigate = useNavigate();
  const isReadOnly = opr === 'view';
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const title = opr === 'view'
    ? `Visualizar Produto: ${id}`
    : opr === 'edit'
    ? `Editar Produto: ${id}`
    : 'Cadastro de Produto';

  useEffect(() => {
    if (id) {
      const fetchProduto = async () => {
        try {
          const produto = await getProdutoById(id);
          reset({
            ...produto,
            preco: formatPreco(produto.preco)
          });
          setImagePreview(produto.foto);
        } catch (error) {
          toast.error('Erro ao carregar produto');
        }
      };
      fetchProduto();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const produto = {
        ...data,
        preco: parsePreco(data.preco),
      };

      const response = id
        ? await updateProduto(id, produto)
        : await createProduto(produto);

      if (!response || !response.id) {
        throw new Error('Erro ao salvar produto');
      }

      toast.success(`Produto ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
      navigate('/produtos');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduto(id);
      toast.success('Produto excluído com sucesso!');
      navigate('/produtos');
    } catch (err) {
      toast.error('Erro ao excluir produto');
    } finally {
      setOpenConfirmDelete(false);
    }
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
                rules={{ required: 'Nome é obrigatório' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nome"
                    fullWidth
                    disabled={isReadOnly}
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="valor"
                control={control}
                defaultValue=""
                rules={{ required: 'Valor é obrigatório' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Valor"
                    fullWidth
                    disabled={isReadOnly}
                    error={!!errors.valor}
                    helperText={errors.valor?.message}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      field.onChange(formatPreco(val));
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="categoria"
                control={control}
                defaultValue=""
                rules={{ required: 'Categoria obrigatória' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Categoria"
                    fullWidth
                    disabled={isReadOnly}
                    error={!!errors.categoria}
                    helperText={errors.categoria?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="descricao"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descrição"
                    fullWidth
                    multiline
                    rows={3}
                    disabled={isReadOnly}
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
                  />
                )}
              />
            </Grid>

           <Grid item xs={12}>
              <Controller
                name="foto"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      disabled={isReadOnly}
                    >
                      Procurar Imagem
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const base64 = reader.result;
                              setImagePreview(base64);
                              field.onChange(base64);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </Button>

                    {(imagePreview || field.value) && (
                      <img
                        src={imagePreview || field.value}
                        alt="Preview"
                        style={{ maxHeight: 150, borderRadius: 8 }}
                      />
                    )}
                  </Box>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="quantidade_em_estoque"
                control={control}
                defaultValue=""
                rules={{ required: 'Obrigatório' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Quantidade em Estoque"
                    fullWidth
                    type="number"
                    disabled={isReadOnly}
                    error={!!errors.quantidade_em_estoque}
                    helperText={errors.quantidade_em_estoque?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="ativo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={!!field.value}
                        disabled={isReadOnly}
                      />
                    }
                    label="Produto Ativo"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="space-between" gap={2}>
              <Button
                onClick={() => navigate('/produtos')}
                variant="outlined"
                color="primary"
              >
                Voltar
              </Button>

              {!isReadOnly && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Salvar
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Dialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza que deseja excluir este produto?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)} color="primary">Cancelar</Button>
          <Button onClick={handleDelete} color="error">Excluir</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProdutoForm;
