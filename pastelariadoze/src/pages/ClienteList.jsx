import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
//Matheus Bairros Silva
function ClienteList() {
  const navigate = useNavigate()

  return (
    <Box sx={{ mt: 4 }}>
      <Toolbar sx={{ backgroundColor: '#1E90FF', borderRadius: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Lista de Clientes</Typography>
        <Button variant="contained" sx={{ backgroundColor: '00008B' }} onClick={() => navigate('/cliente')}>
          Novo Cliente
        </Button>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#00008B' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Nome</TableCell>
              <TableCell sx={{ color: 'white' }}>Telefone</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Matheus Bairros Silva</TableCell>
              <TableCell>(49) 98888-8888</TableCell>
              <TableCell>matheusbairrossilva@gmail.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ClienteList
