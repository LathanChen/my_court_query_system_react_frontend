import React from 'react';
// import { useParams } from 'react-router-dom';
import AdminPageCourtInfoList from '../../components/AdminPageCourtInfoList/AdminPageCourtInfoList'

export default function AdminPageCourtInfoListPage() {

    // 使用useParams()得到的是一个类似{courtId:'7'}这样的对象
    // const courtId = useParams().courtId

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