import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding authorization token to requests
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

// Response interceptor for handling common response issues
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle authentication errors (401)
    if (error.response?.status === 401) {
      // Clear stored credentials and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }

    // Handle forbidden errors (403)
    if (error.response?.status === 403) {
      window.location.href = '/unauthorized';
    }

    // Handle other errors
    return Promise.reject(error);
  },
);

// Generic request function
const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient(config);
  return response.data;
};

// API service methods
const apiService = {
  // GET request
  get: <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      ...config,
      method: 'get',
      url,
      params,
    });
  },

  // POST request
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      ...config,
      method: 'post',
      url,
      data,
    });
  },

  // PUT request
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      ...config,
      method: 'put',
      url,
      data,
    });
  },

  // PATCH request
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      ...config,
      method: 'patch',
      url,
      data,
    });
  },

  // DELETE request
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      ...config,
      method: 'delete',
      url,
    });
  },
};

export default apiService;
