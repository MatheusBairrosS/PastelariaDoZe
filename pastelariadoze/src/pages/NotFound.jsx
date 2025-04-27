import { Box, Typography } from "@mui/material"
//Matheus Bairros Silva
function NotFound() {
  return (
    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <Typography sx={{ color: 'black' }} variant="h2">404</Typography>
      <Typography sx={{ color: 'black' }} variant="h6">Página não encontrada</Typography>
    </Box>
  )
}

export default NotFound
