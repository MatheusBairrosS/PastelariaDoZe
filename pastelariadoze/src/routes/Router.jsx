import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from '../pages/LoginForm'
import Home from '../pages/Home'
import FuncionarioList from '../pages/FuncionarioList'
import FuncionarioForm from '../pages/FuncionarioForm'
import ClienteList from '../pages/ClienteList'
import ClienteForm from '../pages/ClienteForm'
import ProdutoList from '../pages/ProdutoList'
import ProdutoForm from '../pages/ProdutoForm'
import NotFound from '../pages/NotFound'
//Matheus Bairros Silva
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/funcionarios" element={<FuncionarioList />} />
      <Route path="/funcionario" element={<FuncionarioForm />} />
      <Route path="/clientes" element={<ClienteList />} />
      <Route path="/cliente" element={<ClienteForm />} />
      <Route path="/produtos" element={<ProdutoList />} />
      <Route path="/produto" element={<ProdutoForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
