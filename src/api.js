import axios from 'axios';

// 创建 Axios 实例
const api = axios.create({
});

// 添加请求拦截器
api.interceptors.request.use((config) => {
  // 获取 Token，假设你已经正确获取了用户的 Token
  const token = localStorage.getItem('token');
  console.log(token)
  // 如果 Token 存在，则将其添加到请求头中
  if (token) {
    config.headers['token'] = token;
  }

  return config;
}, (error) => {
  // 处理请求错误
  return Promise.reject(error);
});

export default api;
