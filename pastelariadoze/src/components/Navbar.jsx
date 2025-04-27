import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
//Matheus Bairros Silva
function Navbar() {
  const navigate = useNavigate()
  const loginRealizado = localStorage.getItem('loginRealizado')

  const handleLogout = () => {
    localStorage.removeItem('loginRealizado')
    navigate('/login')
  }

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #1E90FF 0%, #00008B 100%)' }}>
      <Toolbar sx={{ height: 70 }}>
        <Typography 
          variant="h5" 
          sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/home')}
        >
          Comandas Pastelaria do Zé
        </Typography>

        {loginRealizado && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/home')}
              sx={{ fontWeight: 'bold', '&:hover': { backgroundColor: '#4682B4' } }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/funcionarios')}
              sx={{ fontWeight: 'bold', '&:hover': { backgroundColor: '#4682B4' } }}
            >
              Funcionários
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/clientes')}
              sx={{ fontWeight: 'bold', '&:hover': { backgroundColor: '#4682B4' } }}
            >
              Clientes
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/produtos')}
              sx={{ fontWeight: 'bold', '&:hover': { backgroundColor: '#4682B4' } }}
            >
              Produtos
            </Button>
            <Button 
              color="inherit" 
              onClick={handleLogout}
              sx={{ fontWeight: 'bold', '&:hover': { backgroundColor: '#FF6347' } }}
            >
              Sair
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
