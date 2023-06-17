import { useState, useEffect } from "react";
// import './QueryForm.css'
import Slider from "react-slick";
import { InputLabel, FormControl, Select, MenuItem, Box, Typography, Button } from '@mui/material';
export default function CourtInfo() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: 'Slide 1',
            // process.env.PUBLIC_URL 变量会动态地指向你的公共文件夹（即 public 目录）
            image: process.env.PUBLIC_URL + '/images/basketball.jpg',
        },
        {
            title: 'Slide 2',
            image: process.env.PUBLIC_URL + '/images/badminton.jpg',
        },
        {
            title: 'Slide 3',
            image: process.env.PUBLIC_URL + '/images/basketball.jpg',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleSlideChange = (value) => {
        setCurrentSlide(value);
    };
    return (
        <Box sx={{
            height: '240px',
            padding: '10px',
            // marginLeft: '50px',
            // marginTop: '50px',
            border: '1px solid skyblue'
        }}>
            <div style={{
                marginBottom: '10px'
            }}>
                <Typography variant="h5" color="primary">
                    寻找队伍
                </Typography>
            </div>
            <div>
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
            </div>
        </Box>
    )
}