import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
//Matheus Bairros Silva
function ProdutoList() {
  const navigate = useNavigate()

  return (
    <Box sx={{ mt: 4 }}>
      <Toolbar sx={{ backgroundColor: '#1E90FF', borderRadius: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Lista de Produtos</Typography>
        <Button variant="contained" sx={{ backgroundColor: '#00008B' }} onClick={() => navigate('/produto')}>
          Novo Produto
        </Button>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#00008B' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Produto</TableCell>
              <TableCell sx={{ color: 'white' }}>Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Produto do Matheus Bairros Silva</TableCell>
              <TableCell>R$ 9,99</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ProdutoList
