import api from '../api';
import { useDispatch } from 'react-redux';


export const useVerifyTokenExpiration = () => {
    const dispatch = useDispatch();
  
    const verifyTokenExpiration = async () => {
      try {
        console.log('验证登录有效期')
        const response = await api.get('/user/authority');
        if (response.data.code === 200) {
          console.log(response.data)
          dispatch({
            type: "LOGIN",
            payload: true,
          });
        } else {
          console.log('登录已过期！');
          localStorage.removeItem("token");
          dispatch({
            type: "LOGOUT",
            payload: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return verifyTokenExpiration;
  };