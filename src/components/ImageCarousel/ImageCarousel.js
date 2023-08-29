import { Carousel, Image } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Skeleton } from 'antd';

export default function ImageCarousel(props) {
    const contentStyle = {
        margin: 0,
        height: '36vw',
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
        await new Promise((resolve) => {
            setTimeout(() => {
            setSkeletonShow(false)
        }, 1000);
        })
    }

    useEffect(() => {
        getCourtImgs(props.courtId)
        handleChangeskeletonShowAfter1s()
        console.log(props.courtId)
    }, [props.courtId])

    const imgDiv = imageAdressesList.map((imgUrl,index) => (
        <div key={index}>
            <Image
                height={'36vw'}
                src={`${process.env.PUBLIC_URL}${imgUrl}`}
            />
        </div>
    ))

    const onChange = (currentSlide) => {
        // console.log(currentSlide);
    };

    return (
        !skeletonShow?(
        <div style={{ width: '48vw', textAlign: 'center', marginTop: '60px' }}>
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
            <div style={{ width: '48vw', textAlign: 'center', marginTop: '60px' }}>
                <Skeleton.Image
                style={{ width: '48vw', height: '36vw' }}  
                active={true} />
            </div>
        )
    )
}