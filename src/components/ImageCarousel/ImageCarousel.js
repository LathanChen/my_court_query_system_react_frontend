import { Carousel, Image } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Skeleton } from 'antd';
import "./ImageCarousel.css"

export default function ImageCarousel(props) {
    const contentStyle = {
        margin: 0,
        height: '60vh',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    // const imageAdresses = process.env.PUBLIC_URL + '/images/courtInfoImages/umeda.jpg'
    // const imageAdresses2 = process.env.PUBLIC_URL + '/images/courtInfoImages/umeda_2.jpg'
    const [imageAdressesList, setImageAdressesList] = useState([])

    const getCourtImgs = async (courtId) => {
        const params =  {courtId:courtId} 
        try {
            const response = await axios.get('/courtinfo/getCourtImgs', { params })
            console.log(response.data)
            setImageAdressesList(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    // 控制骨架屏的显示与关闭
    const [skeletonShow,setSkeletonShow] = useState(true)

    const handleChangeskeletonShowAfter1s = async ()=>{
        let timer
        await new Promise((resolve) => {
            timer = setTimeout(() => {
            setSkeletonShow(false)
            resolve()
        }, 1000);
        })
        clearTimeout(timer)
        console.log(timer)
    }

    useEffect(() => {
        getCourtImgs(props.courtId)
        handleChangeskeletonShowAfter1s()
        console.log(props.courtId)
    }, [props.courtId])

    const imgDiv = imageAdressesList.map((imgUrl,index) => (
        <div key={index}>
            <Image
                height={'60vh'}
                width={'100%'}
                src={`${process.env.PUBLIC_URL}${imgUrl}`}
            />
        </div>
    ))

    const onChange = (currentSlide) => {
        // console.log(currentSlide);
    };

    return (
        !skeletonShow?(
        <div className='images'>
            <Carousel afterChange={onChange} dotPosition={'bottom'} autoplay={true}>
                {/* <div>
                <Image
                style={{}}
                    height={'36vw'}
                    src={imageAdresses}
                />
            </div>
            <div>
                <Image
                style={{}}
                    height={'36vw'}
                    src={imageAdresses2}
                />
            </div> */}
                {imgDiv.length > 0 ? imgDiv :
                <div>
                    <h3 style={contentStyle}>暂无数据！</h3>
                </div>}
{/* 
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>5</h3>
                </div> */}
            </Carousel >
        </div>):(
            <div className='skeleton'>
                <div className='SkeletonDiv'>
                    <Skeleton.Image
                    style={{ width: '50vw', height: '60vh'}}  
                    active={true} />
                </div>               
            </div>
        )
    )
}