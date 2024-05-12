import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './LoginForm.css';

export default function LoginForm() {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const dispatch = useDispatch();
    const handleLogin = () => {
        const fetchData = async () => {
            try {
              const params = {userName,password}
              console.log(params)
              const response = await axios.post('/user/login',params);
              // 处理响应数据
              if (response.data.code === 200){
                const token = response.data.data.token
                localStorage.setItem("token", token);
                console.log(localStorage)
                dispatch({
                    type: "LOGIN",
                    payload: true,
                })
                navigate('/adminpage/dashboard',{ replace: true })
              }
              else {
                console.log(response.data.msg)
              }
            //   console.log(response.data.data.token);
            } catch (error) {
              // 处理错误
              console.error(error);
            }
          };
      
          fetchData(); // 调用发送请求的函数
    };

    const navigate = useNavigate()
    const backToHomepage = () =>{
        navigate('/IndexPage')
    }

    return (
        <div 
            style={{
            height: '100vh',
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(128, 128, 128, 0.1)'
        }}>
            <div style={{alignSelf:'flex-end',padding:'2vh'}}>
                <Button variant="contained" color="primary" onClick={backToHomepage} fullWidth>
                    返回
                </Button>
            </div>
            <div id='login'
            //     style={{
            //     flex:'0 0 300px',
            //     width: '500px',
            //     // height: '40vh',
            //     border: '1px solid skyblue',
            //     backgroundColor: 'white',
            //     marginBottom:'30vh'
            // }}
            >
                <Container maxWidth="sm">
                    <Typography variant="h5" align="center" gutterBottom>
                        <div style={{ marginTop: '2vh' }}>
                            您好，请登录
                        </div>
                    </Typography>
                    <TextField
                        label="Username"
                        value={userName}
                        onChange={handleUsernameChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                    />
                    <div style={{ marginTop: '2vh' }}>
                        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                            Login
                        </Button>
                    </div>

                </Container>
            </div>
        </div>
    )
}