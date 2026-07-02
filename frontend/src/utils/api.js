const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000/api';
  }
  return 'https://temple-management-system-vfbm.onrender.com/api';
};

export const API_BASE_URL = getApiBaseUrl();
export const BACKEND_URL = API_BASE_URL.replace('/api', '');

const getHeaders = (isUpload = false) => {
  const headers = {};
  if (!isUpload) {
    headers['Content-Type'] = 'application/json';
  }
  const token = localStorage.getItem('adminToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    ...getHeaders(options.isUpload),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  // If upload, remove manual content-type header so browser can set boundary automatically
  if (options.isUpload) {
    delete config.isUpload;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      }
      const err = new Error(data.message || 'Something went wrong');
      err.responsePayload = data;
      throw err;
    }
    
    return data;
  } catch (error) {
    console.error(`API Call Error: ${error.message}`);
    throw error;
  }
};
