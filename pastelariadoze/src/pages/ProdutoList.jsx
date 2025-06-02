import React, { useEffect, useState } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Toolbar, Typography, IconButton,
} from '@mui/material';
import { Edit, Delete, Visibility, FiberNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProdutos, deleteProduto } from '../services/produtoService';

function ProdutoList() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const data = await getProdutos();
      setProdutos(data);
    } catch (error) {
      toast.error('Erro ao buscar produtos');
    }
  };

  const handleDeleteClick = (produto) => {
    toast(
      <div>
        <Typography>
          Tem certeza que deseja excluir o produto <strong>{produto.nome}</strong>?
        </Typography>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteConfirm(produto.id_produto)}
            style={{ marginRight: '10px' }}
          >
            Excluir
          </Button>
          <Button variant="outlined" size="small" onClick={() => toast.dismiss()}>
            Cancelar
          </Button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteProduto(id);
      fetchProdutos();
      toast.dismiss();
      toast.success('Produto excluído com sucesso!', { position: 'top-center' });
    } catch (error) {
      toast.error('Erro ao excluir produto.', { position: 'top-center' });
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Toolbar sx={{ backgroundColor: '#1E90FF', borderRadius: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Lista de Produtos</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#00008B' }}
          onClick={() => navigate('/produto')}
          startIcon={<FiberNew />}
        >
          Novo Produto
        </Button>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#00008B' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Foto</TableCell>
              <TableCell sx={{ color: 'white' }}>Produto</TableCell>
              <TableCell sx={{ color: 'white' }}>Descrição</TableCell>
              <TableCell sx={{ color: 'white' }}>Valor</TableCell>
              <TableCell sx={{ color: 'white' }}>Estoque</TableCell>
              <TableCell sx={{ color: 'white' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id_produto}>
                <TableCell>{produto.id_produto}</TableCell>

                <TableCell>
                  {produto.foto ? (
                    <img
                      src={produto.foto}
                      alt={produto.nome}
                      style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Sem foto
                    </Typography>
                  )}
                </TableCell>

                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.descricao}</TableCell>
                <TableCell>{produto.valor}</TableCell>
                <TableCell>{produto.quantidade_em_estoque}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/produto/view/${produto.id_produto}`)}>
                    <Visibility color="primary" />
                  </IconButton>
                  <IconButton onClick={() => navigate(`/produto/edit/${produto.id_produto}`)}>
                    <Edit color="secondary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(produto)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {produtos.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProdutoList;
