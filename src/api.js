import axios from 'axios';

const AWSADRESS = 'http://52.199.19.83:8081'

// 创建 Axios 实例
const api = axios.create({
  //  baseURL: AWSADRESS,//部署用,如果常量不行，使用这个字符串:'http://18.183.169.200:8081',开发环境，将此行注释掉即可，无需配置baseURL和timeout
  //  timeout: 5000, // 部署用，设置请求超时时间
});

// 添加请求拦截器
api.interceptors.request.use((config) => {
  // 获取 Token，假设你已经正确获取了用户的 Token
  console.log('api被调用了！')
  const token = localStorage.getItem('token');
  // console.log(token)
  // 如果 Token 存在，则将其添加到请求头中
  if (token) {
    console.log('token被设置了！')
    config.headers.token = token
  }

  return config;
}, (error) => {
  // 处理请求错误
  return Promise.reject(error);
});

export default api;
