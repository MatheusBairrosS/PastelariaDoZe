import axios from 'axios';

const PROXY_URL = import.meta.env.VITE_PROXY_BASE_URL + "funcionario/";

// Obter todos os funcionários
export const getFuncionarios = async () => {
  const response = await axios.get(`${PROXY_URL}all`);
  return response.data;
};

// Obter um funcionário por ID
export const getFuncionarioById = async (id) => {
  const response = await axios.get(`${PROXY_URL}one`, {
    params: { id_funcionario: id },
  });
  return response.data[0];
};

// Criar um novo funcionário
export const createFuncionario = async (funcionario) => {
  const response = await axios.post(`${PROXY_URL}`, funcionario);
  return response.data;
};

// Atualizar um funcionário existente
export const updateFuncionario = async (id, funcionario) => {
  const response = await axios.put(`${PROXY_URL}`, funcionario, {
    params: { id_funcionario: id },
  });
  return response.data;
};

// Deletar um funcionário
export const deleteFuncionario = async (id) => {
  const response = await axios.delete(`${PROXY_URL}`, {
    params: { id_funcionario: id },
  });
  return response.data;
};

// Obter um funcionário por CPF
export const getFuncionarioByCPF = async (cpf) => {
  try {
    const response = await axios.get(`${PROXY_URL}cpf/${cpf}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

//Verificar Cpf
export const verificarCpfExistente = async (cpf) => {
    const response = await axios.get(`${PROXY_URL}cpf?cpf=${cpf}`);
    return response.data;
};
