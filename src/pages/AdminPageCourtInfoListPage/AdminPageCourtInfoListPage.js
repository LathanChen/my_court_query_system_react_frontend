import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminPageCourtInfoList from '../../components/AdminPageCourtInfoList/AdminPageCourtInfoList'
import Header from '../../components/Header/Header'
import axios from 'axios';
import { Skeleton } from 'antd';

export default function AdminPageCourtInfoListPage() {

    // 使用useParams()得到的是一个类似{courtId:'7'}这样的对象
    const courtId = useParams().courtId

    // const [skeletonShow,setSkeletonShow] = useState(true)

    // useEffect(() =>{
    //     setTimeout(() => {
    //         setSkeletonShow(false)
    //     }, 500);
    // },[])

    return (
        <div style={{
            display:'flex',
            border: '1px solid skyblue',
        }}>
            <AdminPageCourtInfoList></AdminPageCourtInfoList>
        </div>
    )
}