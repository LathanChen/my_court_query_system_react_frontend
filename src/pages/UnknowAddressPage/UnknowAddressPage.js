import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Empty } from 'antd';
import './UnknowAddressPage.css'

export default function UnknowAddressPage() {

    const navigate = useNavigate()
    const backToHomepage = () => {
        navigate('/IndexPage')
    }

    return (
        <div id='empty-container'>
            <Empty
                imageStyle={{
                    height: 60,
                }}
                description={
                    <span>
                        関連ページは見つかりません
                    </span>
                }
            >
                <Button type="primary" onClick={backToHomepage}>ホームページに戻す</Button>
            </Empty>
        </div>
    )
}