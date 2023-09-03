import React, { useState,useEffect } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';

export default function RegisterForm() {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        if (showSuccessAlert) {
          const timer = setTimeout(() => {
            setShowSuccessAlert(false);
            navigate('/login',{ replace: true })
          }, 2000); // 2秒后自动隐藏
          return () => {
            clearTimeout(timer)
            console.log(timer)
          };
        }
        if (showErrorAlert) {
          const timer = setTimeout(() => {
            setShowErrorAlert(false);
          }, 2000); // 2秒后自动隐藏
          return () => {
            clearTimeout(timer)
            console.log(timer)
          }
        }
      }, [showSuccessAlert,showErrorAlert]);
      
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const dispatch = useDispatch();
    const handleLogin = () => {
        const fetchData = async () => {
            try {
              const params = {userName,password,email}
            //   console.log(params)
              const response = await axios.post('/user/register',params);
              // 处理响应数据
              if (response.data === true){
                setShowSuccessAlert(true)
              }
              else {
                setShowErrorAlert(true)
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
        navigate('/homepage')
    }

    return (
        <div style={{
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
            {showSuccessAlert && (
                <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                注册成功，为您跳转到登录页面
              </Alert>
            )}
            {showErrorAlert && (
                <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                用户名已被使用，请重新输入
              </Alert>
            )}

            <div style={{
                width: '30%',
                height: '50vh',
                border: '1px solid skyblue',
                backgroundColor: 'white',
                marginBottom:'25vh'
            }}>
                <Container maxWidth="sm">
                    <Typography variant="h5" align="center" gutterBottom>
                        <div style={{ marginTop: '2vh' }}>
                            您好，请输入注册信息
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
                    <TextField
                        label="E-mail"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                        margin="normal"
                    />
                    <div style={{ marginTop: '2vh' }}>
                        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                            注册
                        </Button>
                    </div>

                </Container>
            </div>
        </div>
    )
}