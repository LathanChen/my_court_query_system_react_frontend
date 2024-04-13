import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  Button, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export default function ErrorMsg() {

    const navigate = useNavigate()
    const backToHomepage = () => {
        navigate('/IndexPage')
    }
    // const dispatch = useDispatch();

    // useEffect = () => {
    //     dispatch({
    //         type: "LOGOUT",
    //         payload: false,
    //       });
    // }

    return (
        <div style={{
            height: '100vh',
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            backgroundColor: 'rgba(128, 128, 128, 0.1)'
        }}>
            <div style={{ marginLeft: 'auto', padding: '2vh', width: '5vw', marginBottom: '25vh' }}>
                <Button variant="contained" color="primary" onClick={backToHomepage} fullWidth>
                    返回
                </Button>
            </div>
            <div style={{
                width: '30%',
                height: '40vh',
                border: '1px solid skyblue',
                backgroundColor: 'white',
                margin: 'auto'
            }}>

                <Typography variant="h6" style={{ textAlign: 'center' }}>
                    对不起，您没有访问权限或登录已过期！
                </Typography>
                <div style={{ margin: 'auto' }}>
                    <ErrorIcon style={{
                        fontSize: '12vw',
                        marginLeft: '9vw',
                        marginTop: '5vh',
                    }}
                        color='error' />
                </div>
            </div>
        </div>
    )
}