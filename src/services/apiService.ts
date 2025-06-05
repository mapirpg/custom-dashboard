import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }

    if (error.response?.status === 403) {
      window.location.href = '/unauthorized';
    }

    return Promise.reject(error);
  },
);

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient(config);
  return response.data;
};

const apiService = {
  get: <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      ...config,
      method: 'get',
      url,
      params,
    });
  },

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      ...config,
      method: 'post',
      url,
      data,
    });
  },

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      ...config,
      method: 'put',
      url,
      data,
    });
  },
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      ...config,
      method: 'patch',
      url,
      data,
    });
  },
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      ...config,
      method: 'delete',
      url,
    });
  },
};

export default apiService;
