import axios from 'axios';

const PROXY_URL = import.meta.env.VITE_PROXY_BASE_URL + "produto/";

// Obter todos os produtos
export const getProdutos = async () => {
  const response = await axios.get(`${PROXY_URL}all`);
  return response.data;
};

// Obter um produto por ID
export const getProdutoById = async (id) => {
  const response = await axios.get(`${PROXY_URL}one`, {
    params: { id_produto: id },
  });
  return response.data[0];
};

// Criar um novo produto
export const createProduto = async (produto) => {
  const response = await axios.post(`${PROXY_URL}`, produto);
  return response.data;
};

// Atualizar um produto existente
export const updateProduto = async (id, produto) => {
  const response = await axios.put(`${PROXY_URL}`, produto, {
    params: { id_produto: id },
  });
  return response.data;
};

// Deletar um produto
export const deleteProduto = async (id) => {
  const response = await axios.delete(`${PROXY_URL}`, {
    params: { id_produto: id },
  });
  return response.data;
};
