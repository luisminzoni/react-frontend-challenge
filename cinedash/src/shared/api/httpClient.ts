import axios from 'axios';
import { config } from '@/shared/config/api';

export const httpClient = axios.create({
  baseURL: config.baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors podem ser adicionados aqui
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento de erros global
    return Promise.reject(error);
  }
);