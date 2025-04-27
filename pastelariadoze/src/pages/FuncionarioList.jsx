import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
//Matheus Bairros Silva
function FuncionarioList() {
  const navigate = useNavigate()

  return (
    <Box sx={{ mt: 4 }}>
      <Toolbar sx={{ backgroundColor: '#1E90FF', borderRadius: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Lista de Funcionários</Typography>
        <Button variant="contained" sx={{ backgroundColor: '00008B' }} onClick={() => navigate('/funcionario')}>
          Novo Funcionário
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
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Matheus Bairros Silva</TableCell>
              <TableCell>123.456.789-00</TableCell>
              <TableCell>(49) 99999-9999</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default FuncionarioList
