import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';
import Icon from '@mui/material/Icon';
import ErrorIcon from '@mui/icons-material/Error';

export default function LoginForm() {

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
                        对不起，您没有访问权限
                        </div>
                    </Typography>
                <Icon>
                    <ErrorIcon/>
                    </Icon>    
                </Container>
            </div>
        </div>
    )
}