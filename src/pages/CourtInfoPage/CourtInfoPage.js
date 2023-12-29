import React from 'react';
import { useParams } from 'react-router-dom';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel'
import EvaluateZone from '../../components/EvaluateZone/EvaluateZone'
import Header from '../../components/Header/Header'
import './CourtInfoPage.css'

export default function CourtInfoPage() {

    // 使用useParams()得到的是一个类似{courtId:'7'}这样的对象
    const courtId = useParams().courtId

    // const [skeletonShow,setSkeletonShow] = useState(true)

    // useEffect(() =>{
    //     setTimeout(() => {
    //         setSkeletonShow(false)
    //     }, 500);
    // },[])

    return (
        <div>
            <Header></Header>
            <div id='imageAndEvaluate'>
                <ImageCarousel courtId={courtId}></ImageCarousel>
                <EvaluateZone courtId={courtId}></EvaluateZone>
            </div>
        </div>
    )
}