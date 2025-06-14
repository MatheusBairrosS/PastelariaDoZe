import React, { useEffect, useState } from "react";
import {Box,Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Toolbar,Typography,IconButton,useMediaQuery,} from '@mui/material';
import { Edit, Delete, Visibility, FiberNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getFuncionarios, deleteFuncionario } from '../services/funcionarioService';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import { gerarRelatorioPDF } from '../utils/pdfReport';

function FuncionarioList() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const data = await getFuncionarios();
      setFuncionarios(data);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  const handleDeleteClick = (funcionario) => {
    toast(
      <div>
        <Typography>
          Tem certeza que deseja excluir o funcionário <strong>{funcionario.nome}</strong>?
        </Typography>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteConfirm(funcionario.id_funcionario)}
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
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteFuncionario(id);
      fetchFuncionarios();
      toast.dismiss();
      toast.success('Funcionário excluído com sucesso!', { position: "top-center" });
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      toast.error('Erro ao excluir funcionário.', { position: "top-center" });
    }
  };

  const formatCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  };

  const formatTelefone = (telefone) => {
    if (!telefone) return '';
    return telefone.length === 11
      ? telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
      : telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  };

  const handleGerarRelatorio = () => {
  const colunas = ['ID', 'Nome', 'CPF', 'Telefone'];
  const dadosFormatados = funcionarios.map((f) => ({
    ID: f.id_funcionario,
    Nome: f.nome,
    CPF: formatCPF(f.cpf),
    Telefone: formatTelefone(f.telefone),
  }));

  gerarRelatorioPDF({
    titulo: 'Relatório de Funcionários',
    colunas,
    dados: dadosFormatados,
    incluirImagem: true,
  });
};

  return (
    <Box sx={{ mt: 4 }}>
      <Toolbar sx={{ backgroundColor: '#1E90FF', borderRadius: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Lista de Funcionários</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#00008B' }}
          onClick={() => navigate('/funcionario')}
          startIcon={<FiberNew />}
        >
          Novo Funcionário
        </Button>

        <Button
          variant="contained"
          sx={{ backgroundColor: '#00008B', ml: 2 }}
          onClick={handleGerarRelatorio}
        >
          Gerar Relatório
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
            {funcionarios.map((funcionario) => (
              <TableRow key={funcionario.id_funcionario}>
                <TableCell>{funcionario.id_funcionario}</TableCell>
                <TableCell>{funcionario.nome}</TableCell>
                <TableCell>{formatCPF(funcionario.cpf)}</TableCell>
                <TableCell>{formatTelefone(funcionario.telefone)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/funcionario/view/${funcionario.id_funcionario}`)}>
                    <Visibility color="primary" />
                  </IconButton>
                  <IconButton onClick={() => navigate(`/funcionario/edit/${funcionario.id_funcionario}`)}>
                    <Edit color="secondary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(funcionario)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default FuncionarioList;
