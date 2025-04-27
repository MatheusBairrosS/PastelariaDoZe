import React from "react";
import { Container } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/Router";
// toastify para notificações
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>

      {/* O ToastContainer é o componente que renderiza as notificações na tela */}
      <ToastContainer position="top-center" autoClose={3000} />

      {/* O Navbar é o componente de navegação que contém os links para as diferentes páginas da aplicação */}
      <Navbar />

      {/* O Container é um componente do Material-UI que fornece um layout responsivo e centralizado */}
      <Container sx={{ mt: 4 }}>

        {/* O AppRoutes é o componente que contém as rotas da aplicação, definindo quais componentes devem ser renderizados em cada rota */}
        <AppRoutes />

      </Container>

    </AuthProvider>
  );
}

export default App;
