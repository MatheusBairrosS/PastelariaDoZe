import React, { useEffect, useState } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Toolbar, Typography, IconButton
} from '@mui/material';
import { Edit, Delete, Visibility, FiberNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getClientes, deleteCliente } from '../services/clienteService';

function ClienteList() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      toast.error('Erro ao buscar clientes');
    }
  };

  const handleDeleteClick = (cliente) => {
    toast(
      <div>
        <Typography>
          Tem certeza que deseja excluir o cliente <strong>{cliente.nome}</strong>?
        </Typography>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteConfirm(cliente.id_cliente)}
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
      await deleteCliente(id);
      fetchClientes();
      toast.dismiss();
      toast.success('Cliente excluído com sucesso!', { position: 'top-center' });
    } catch (error) {
      toast.error('Erro ao excluir cliente.', { position: 'top-center' });
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Toolbar sx={{ backgroundColor: '#1E90FF', borderRadius: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Lista de Clientes</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#00008B' }}
          onClick={() => navigate('/cliente')}
          startIcon={<FiberNew />}
        >
          Novo Cliente
        </Button>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#00008B' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Nome</TableCell>
              <TableCell sx={{ color: 'white' }}>CPF</TableCell>
              <TableCell sx={{ color: 'white' }}>Telefone</TableCell>
              <TableCell sx={{ color: 'white' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id_cliente}>
                <TableCell>{cliente.id_cliente}</TableCell>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.cpf}</TableCell>
                <TableCell>{cliente.telefone}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/cliente/view/${cliente.id_cliente}`)}>
                    <Visibility color="primary" />
                  </IconButton>
                  <IconButton onClick={() => navigate(`/cliente/edit/${cliente.id_cliente}`)}>
                    <Edit color="secondary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(cliente)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {clientes.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ClienteList;
