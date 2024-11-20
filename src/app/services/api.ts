import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
// import { useNavigate } from 'react-router-dom';
import {AuthModel} from '../modules/auth'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

const api: AxiosInstance = axios.create({
  baseURL: '/proxy', // Vite will proxy this to http://127.0.0.1:5000
  // proxy: {
  //   host: import.meta.env.VITE_ETMS_API_URL, // Change to the host you want to use
  //   port: import.meta.env.VITE_ETMS_API_PORT,        // Change to the port of your backend
  // },
});

api.defaults.headers.Accept = 'application/json';

// export const setupApi = (logout: () => void) => {
  // Request interceptor to attach Authorization header
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const auth = getAuth();
      if (auth && auth.data.token) {
        config.headers['Authorization'] = `Bearer ${auth.data.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const handleLogout = () => {
    removeAuth();
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    window.location.href = '/auth/login'; // Redirect to login page
  };

  // Response interceptor to handle 401 errors
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        handleLogout();
        console.warn('Unauthorized request. Logging out...');
        //logout();
      }
      return Promise.reject(error);
    }
  );
//};

export default api;