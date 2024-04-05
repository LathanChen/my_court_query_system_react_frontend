import api from '../api';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';


export const useVerifyTokenExpiration = () => {
    const dispatch = useDispatch();
  
    const verifyTokenExpiration = useCallback(async () => {
      try {
        console.log('验证登录有效期')
        const response = await api.get('/user/authority');
        console.log(response.data.code)
        if (response.data.code === 200) {
          console.log(response.data)
          dispatch({
            type: "LOGIN",
            payload: true,
          });
          return true
        } else {
          console.log('登录已过期！');
          localStorage.removeItem("token");
          dispatch({
            type: "LOGOUT",
            payload: false,
          });
          return false
        }
      } catch (error) {
        console.error(error);
      }
    },[dispatch]);
  
    return verifyTokenExpiration;
  };