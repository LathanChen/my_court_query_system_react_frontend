import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        // 在此处执行登录逻辑
        console.log('Username:', username);
        console.log('Password:', password);
    };

    const navigate = useNavigate()
    const backToHomepage = () =>{
        navigate('/homepage')
    }

    return (
        <div style={{
            backgroundColor: 'white',
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
            <div style={{
                width: '30%',
                height: '40vh',
                border: '1px solid skyblue',
                backgroundColor: 'white',
                marginBottom:'30vh'
            }}>
                <Container maxWidth="sm">
                    <Typography variant="h5" align="center" gutterBottom>
                        <div style={{ marginTop: '2vh' }}>
                            您好，请登录
                        </div>
                    </Typography>
                    <TextField
                        label="Username"
                        value={username}
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