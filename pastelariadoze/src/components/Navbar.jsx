import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
//Matheus Bairros Silva
function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // Setup do responsive
  const theme = useTheme();
  // true se largura ≤ 'sm' (600px por padrão)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{ background: 'linear-gradient(90deg, #1E90FF 0%, #00008B 100%)' }}
    >
      <Toolbar sx={{ height: 70 }}>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/home')}
        >
          Comandas Pastelaria do Zé
        </Typography>

        {isAuthenticated && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Home */}
            {isSmallScreen ? (
              <IconButton color="inherit" onClick={() => navigate('/home')}>
                <HomeIcon />
              </IconButton>
            ) : (
              <Button
                color="inherit"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/home')}
                sx={{ fontWeight: 'bold' }}
              >
                Home
              </Button>
            )}

            {/* Funcionários */}
            {isSmallScreen ? (
              <IconButton color="inherit" onClick={() => navigate('/funcionarios')}>
                <PeopleIcon />
              </IconButton>
            ) : (
              <Button
                color="inherit"
                startIcon={<PeopleIcon />}
                onClick={() => navigate('/funcionarios')}
                sx={{ fontWeight: 'bold' }}
              >
                Funcionários
              </Button>
            )}

            {/* Clientes */}
            {isSmallScreen ? (
              <IconButton color="inherit" onClick={() => navigate('/clientes')}>
                <PersonIcon />
              </IconButton>
            ) : (
              <Button
                color="inherit"
                startIcon={<PersonIcon />}
                onClick={() => navigate('/clientes')}
                sx={{ fontWeight: 'bold' }}
              >
                Clientes
              </Button>
            )}

            {/* Produtos */}
            {isSmallScreen ? (
              <IconButton color="inherit" onClick={() => navigate('/produtos')}>
                <ShoppingCartIcon />
              </IconButton>
            ) : (
              <Button
                color="inherit"
                startIcon={<ShoppingCartIcon />}
                onClick={() => navigate('/produtos')}
                sx={{ fontWeight: 'bold' }}
              >
                Produtos
              </Button>
            )}

            {/* Logout */}
            {isSmallScreen ? (
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            ) : (
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ fontWeight: 'bold' }}
              >
                Sair
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
