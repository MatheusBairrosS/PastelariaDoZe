import { Box, Typography } from "@mui/material";
//Matheus Bairros Silva
function Home() {
  return (
    <Box
      sx={{
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        px: 2,
        animation: 'fadeIn 1s ease-out',
      }}
    >
      <Typography 
        variant="h2" 
        sx={{ 
          fontWeight: 'bold', 
          mb: 2, 
          color: 'primary.main', 
          textAlign: 'center'
        }}
      >
        Comandas Pastelaria do Zé
      </Typography>
      <Typography 
        variant="h5" 
        sx={{ 
          color: 'text.secondary', 
          textAlign: 'center',
          maxWidth: 600 
        }}
      >
        Bem-vindo ao sistema Matheus Bairros Silva! Gerencie suas comandas de forma prática e eficiente.
      </Typography>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
}

export default Home;
