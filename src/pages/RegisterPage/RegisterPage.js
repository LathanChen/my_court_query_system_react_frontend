import React, { useState } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm'

export default function RegisterPage() {


    return (
        <div style={{
            height: '100vh',
            backgroundColor: 'rgba(128, 128, 128, 0.1)'
        }}>
           <RegisterForm></RegisterForm>
        </div>
    )
}