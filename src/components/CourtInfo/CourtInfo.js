import { useState,useEffect} from "react";
// import './QueryForm.css'
import Slider from "react-slick";
import {  Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Pagination } from 'antd';
import axios from 'axios';

export default function CourtInfo() {
    // const [currentSlide, setCurrentSlide] = useState(0);

    // const slides = [
    //     {
    //         title: 'Slide 1',
    //         // process.env.PUBLIC_URL 变量会动态地指向你的公共文件夹（即 public 目录）
    //         image: process.env.PUBLIC_URL + '/images/basketball.jpg',
    //     },
    //     {
    //         title: 'Slide 2',
    //         image: process.env.PUBLIC_URL + '/images/badminton.jpg',
    //     },
    //     {
    //         title: 'Slide 3',
    //         image: process.env.PUBLIC_URL + '/images/basketball.jpg',
    //     },
    // ];

    // 副作用函数，用于处理组件内图片轮播的时间间隔
    // 8.18修改：组件内取消了图片轮播，改为了展示各场地的名称链接
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    //     }, 300000);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);
    
    const [currentPage,setCurrentPage] = useState(1)

    const findNextPageCourtNames = (page) => setCurrentPage(page)

    const [courtNameDatas,setCourtNameDatas] = useState({
        list:[],
        count:0,
        pageNum:1,
        pages:0,
        total:0
    })


    const getCourtNames = async () =>{
        const params = {PageNum:currentPage,PageSize:8}
        try {
            const response = await axios.get('/courtinfo/getcourtnames',{params});
            console.log(response.data)
            setCourtNameDatas(response.data)
        }
        catch(error) {
            console.error(error);
        }
    }

    useEffect(() =>{        
        getCourtNames()
    },[currentPage])

    // 根据序号设定特定的样式
    const courtNames_Col = courtNameDatas.list.map((courtInfo,index) => {
        if  (index%2 === 0){
            return (
            <Col span={12} style={{ textAlign: 'left ',marginTop: '10px' }}>
            <Link to={`/courtInfoPage/${courtInfo.courtId}`} style={{ textDecoration: 'underline',color:'black' }}>
            {courtInfo.courtName}
            </Link>
        </Col>)}
        else {
            return (
            <Col span={12} style={{ textAlign: 'right ',marginTop: '10px' }}>
            <Link to={`/courtInfoPage/${courtInfo.courtId}`} style={{ textDecoration: 'underline',color:'black' }}>
            {courtInfo.courtName}
            </Link>
        </Col>)}
})

    // const handleSlideChange = (value) => {
    //     setCurrentSlide(value);
    // };

    return (
        <Box sx={{
            height: '32vh',
            padding: '1vh',
            // marginLeft: '50px',
            // marginTop: '50px',
            border: '1px solid skyblue',
            overflow:'hidden'
        }}>
            <div style={{
                padding:'1vh',
                marginBottom: '1vh'
            }}>
                <Typography variant="h5" color="primary">
                    场馆信息
                </Typography>
            </div>
            <div style={{height:'16vh',width:'96%',margin:'auto',padding:'10px'}}>
                <Row>
                    {courtNames_Col}
                </Row>
            </div>
            {/* <div style={{height:'16vh',width:'96%',margin:'auto',padding:'10px'}}>
            <Row>
                <Col span={12} style={{ textAlign: 'left ',marginTop: '10px' }}>
                    <Link style={{ textDecoration: 'underline',color:'black' }}>
                    足立中央本町学習センター
                    </Link>
                </Col>
                <Col span={12} style={{ textAlign: 'right ',marginTop: '10px' }}>
                    <Link style={{ textDecoration: 'underline',color:'black' }}>
                    中央本町学習センター
                    </Link>
                </Col>
                <Col span={12} style={{ textAlign: 'left ',marginTop: '10px'  }}>
                    <Link style={{ textDecoration: 'underline',color:'black' }}>
                    本町学習センター
                    </Link>
                </Col>
                <Col span={12} style={{ textAlign: 'right ',marginTop: '10px'  }}>
                    <Link style={{ textDecoration: 'underline',color:'black' }}>
                    足立中央本町学習センター
                    </Link>
                </Col>
                <Col span={12} style={{ textAlign: 'left ',marginTop: '10px'  }}>
                    <Link style={{ textDecoration: 'underline',color:'black' }}>
                    足立中央本町学習センター
                    </Link>
                </Col>
                <Col span={12} style={{ textAlign: 'right ',marginTop: '10px'  }}>
                    <Link style={{ textDecoration: 'underline',color:'black' }}>
                    中央本町学習センター
                    </Link>
                </Col>
                <Col span={12} style={{ textAlign: 'left ',marginTop: '10px'  }}>
                    <Link style={{ textDecoration: 'underline',color:'black' }}>
                    足立中央本町学習センター
                    </Link>
                </Col>
            </Row>
            </div>             */}
            <div style={{display:'flex',width:'96%',justifyContent: 'flex-end',padding:'10px',}}>
                <Pagination 
                defaultCurrent={1}
                current={currentPage} 
                total={courtNameDatas.total} 
                pageSize={8} 
                size="small"
                onChange={findNextPageCourtNames}
                />
            </div>

            {/* <div>
                <Slider
                    min={0}
                    max={slides.length - 1}
                    step={1}
                    value={currentSlide}
                    onChange={handleSlideChange}
                />
                <div>
                    {slides.map((slide, index) => (
                        <div key={index} style={{ display: index === currentSlide ? 'block' : 'none', color: index === currentSlide ? 'green' : 'red' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <img src={slide.image} alt={slide.title} />
                            </div>

                        </div>
                    ))}
                </div>
            </div> */}
        </Box>
    )
}