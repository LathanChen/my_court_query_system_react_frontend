import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Image } from 'antd';
import GeneralUserPageMain from '../../components/GeneralUserPageMain/GeneralUserPageMain'
// import './QueryForm.css'
import Slider from "react-slick";
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Pagination } from 'antd';
import api from '../../api';
import Header from "../../components/Header/Header";

export default function GeneralUserPage() {

    return (
        <div>
            <Header></Header>
            <GeneralUserPageMain></GeneralUserPageMain>
        </div>
    )
}