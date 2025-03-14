import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Altere para a URL real do backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

export const getCart = async () => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cart:', error);
    return [];
  }
};

export const addItem = async (item) => {
  try {
    const response = await api.post('/cart', item);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
  }
};

export const removeItem = async (id) => {
  try {
    await api.delete(`/cart/${id}`);
  } catch (error) {
    console.error('Erro ao remover item:', error);
  }
};

export const updateQuantidade = async (id, quantity, productId) => {
  try {
    const response = await api.put(`/cart/${id}`, { 
      quantity, 
      productId 
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar quantidade:', error);
  }
};

export const aplicarDesconto = async (codigo) => {
  try {
    const response = await api.post('/desconto', { codigo });
    return response.data;
  } catch (error) {
    console.error('Erro ao aplicar desconto:', error);
  }
};

export default api;
