import api from './api';

// 用于进入每个管理员页面之前，向后台验证token有效期（通过封装的api方法)及权限名称
// @dispatch 每个组件中使用useDispatch()得到的对象
// @dosth:希望在finally里执行的动作
export const authFetch = async (dispatch,dosth) => {
    try {
        const response = await api.get('/user/authority');
        if (response.data.code === 200) {
            console.log(response.data);
            for (const element of response.data.data) {
                if (element === 'test') {
                    dispatch({
                        type: 'LOGIN',
                        payload: true,
                    });
                    break;
                }
            }
        }
        else {
            dispatch({
                type: 'LOGOUT',
                payload: false,
            });
            localStorage.removeItem('token');
        }
    } catch (error) {
        console.error(error);
    }
    finally {
        dosth()
    }
};
