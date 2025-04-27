import { Container } from '@mui/material'
import Navbar from './components/Navbar'
import AppRoutes from './routes/Router'

function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <AppRoutes />
      </Container>
    </>
  )
}

export default App
