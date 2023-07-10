import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm'
import axios from 'axios';

export default function LoginPage() {


    return (
        <div style={{
            height: '100vh',
            backgroundColor: 'rgba(128, 128, 128, 0.1)'
        }}>
           <LoginForm></LoginForm>
        </div>
    )
}