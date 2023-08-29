import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Steps, Col, Row, Input, Checkbox } from 'antd';
import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import axios from 'axios'; //部署用

// 是将给定的文件（通常是图像文件）转换为Base64编码字符串。
// Base64编码是一种将二进制数据转换为可在文本环境中传输的ASCII字符的方法。在Web开发中，常常使用Base64编码来嵌入图像、音频等媒体数据，或者将二进制数据传输到服务器。
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

// 获取antd中Input组件的Search组件（有搜索按钮的输入框）
const { Search } = Input;

export default function AdminPageAddItempage(props) {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    // 页面上的进度步骤
    const [stepPage,setStepPage] = useState(0)

    const [courtInfos,setCourtInfos] = useState({
        courtName:'',
        courtAdress:'',
        courtTelNum:'',
        courtStation:'',
        courtFromStationDistance:0,
    })

    const handleChangeCourtName = (e) => {
        setCourtInfos({
            ...courtInfos,
            courtName:e.target.value
        })
    }
    /*
    @value:画面上输入的内容的值
    @event:本次事件的对象
        */
    const checkSameCourtName = (value,event) => {
        // todo:发送请求，确认当前数据库中没有同名的场地名
        console.log(value)
        console.log(event)
    }

    const handleChangeCourtAdress = (e) => {
        setCourtInfos({
            ...courtInfos,
            courtAdress:e.target.value
        })
    }

    const handleChangeCourtTelNum = (e) => {
        setCourtInfos({
            ...courtInfos,
            courtTelNum:e.target.value
        })
    }

    const handleChangeCourtStation = (e) => {
        setCourtInfos({
            ...courtInfos,
            courtStation:e.target.value
        })
    }

    const handleChangeCourtFromStationDistance = (e) => {
        setCourtInfos({
            ...courtInfos,
            courtFromStationDistance:e.target.value
        })
    }

    const handleCancel = () => setPreviewOpen(false);

    // 当点击页面上的预览按钮时触发
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        // ?.是js中的可选链操作符，它的作用是检查 file.error 对象是否存在，如果存在则尝试访问其 statusText 属性。
        // 如果 file.error 不存在，整个表达式的结果会直接返回 undefined，而不会引发错误。
        // if (file?.error?.statusText) {
        //     setPreviewImage('')
        // }
        // console.log(file)
        // if (file.response.code !== 200) {
        //     setPreviewImage('')
        // }
        // else {
        //     if (!file.url && !file.preview) {
        //         file.preview = await getBase64(file.originFileObj);
        //     }
        //     setPreviewImage(file.url || file.preview);
        // }        
        // setPreviewOpen(true);
        // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.map(file => {
            if (file.status === 'done') {
                // 根据服务器返回的状态码来决定是否显示文件
                if (file.response.code === 200) {
                    return {
                        ...file,
                        url: file.response.data
                    };
                }
                else {
                    return {
                        ...file,
                        status: 'error',
                        // 参考：https://blog.csdn.net/qq_42802698/article/details/126518496
                        // 用于设置文件上传出错时，页面显示的错误信息
                        error: { statusText: file.response.msg }
                    };
                }
            }
            else {
                return file;
            }
        }));
        console.log(newFileList)
        // if (newFileList.status === 'done' && newFileList.response.code === 200){
        // setFileList(newFileList)
        // }
        // else {
        //     if (newFileList.response.msg){
        //         console.log(newFileList.response.msg)
        //     // todo:设置错误消息
        //     }

        // }

    }
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                选择文件
            </div>
        </div>
    );

    const showList = () => {
        console.log(fileList)
    }

    const onError = (error) => {
        console.log(error)
    };

    return (
        <Box sx={{
            // 开启flex布局
            display: 'flex',
            // 改变felx主轴方向
            flexDirection: 'column',
            // 主轴的对齐方式
            // justifyContent: 'space-around',
            // 交叉轴的对齐方式
            alignItems: 'center',
            width: '32vw',
            height: '75vh',
            margin: 'auto',
            padding: '1vh',
            // marginLeft: '50px',
            // marginTop:'50px',
            border: '1px solid skyblue',
            overflow: 'auto'
        }}>
            <Steps
                current={stepPage}
                items={[
                    {
                        title: '基本信息',
                        description: '输入基本信息',
                    },
                    {
                        title: '上传图片',
                        description: '可跳过',
                    },
                    {
                        title: '完成',
                    },
                ]}
            />
            {stepPage === 0 ?(<div style={{ width: '100%',marginTop:'50px',height:'60%' }}>
                <Row align="middle">
                    <Col span={3} style={{textAlign:'center'}}>
                        名称：
                    </Col>
                    <Col span={21}>
                        <Search
                            placeholder="请输入场馆名称"
                            onChange={handleChangeCourtName}
                            onSearch={checkSameCourtName}
                        />
                    </Col>
                    <Col span={3} style={{textAlign:'center',marginTop:'30px'}}>
                        地址：
                    </Col>
                    <Col span={21} style={{marginTop:'30px'}}>
                        <Input
                            placeholder="请输入地址"
                            onChange={handleChangeCourtAdress}
                        />
                    </Col>
                    <Col span={3} style={{textAlign:'center',marginTop:'30px'}}>
                        电话：
                    </Col>
                    <Col span={5} style={{marginTop:'30px'}}>
                        <Input
                            placeholder="请输入电话号码"
                            onChange={handleChangeCourtTelNum}
                        />
                    </Col>
                    <Col span={4} style={{textAlign:'center',marginTop:'30px'}}>
                        最寄り駅：
                    </Col>
                    <Col span={6} style={{marginTop:'30px'}}>
                        <Input
                            placeholder="请输入车站名"
                            onChange={handleChangeCourtStation}
                        />
                    </Col>
                    <Col span={3} style={{textAlign:'center',marginTop:'30px'}}>
                        徒歩：
                    </Col>
                    <Col span={2} style={{marginTop:'30px'}}>
                        <Input
                        onChange={handleChangeCourtFromStationDistance}
                        />
                    </Col>
                    <Col span={1} style={{marginTop:'30px'}}>
                        分
                    </Col>
                    {/* <Col span={3} style={{textAlign:'center',marginTop:'30px'}}>
                        项目：
                    </Col>
                    <Col span={21} style={{marginTop:'30px'}}>
                        <Checkbox 
                        // onChange={onChange}
                        >
                            Checkbox
                        </Checkbox>
                        <Checkbox 
                        // onChange={onChange}
                        >
                            Checkbox
                        </Checkbox>
                        <Checkbox 
                        // onChange={onChange}
                        >
                            Checkbox
                        </Checkbox>
                        <Checkbox 
                        // onChange={onChange}
                        >
                            Checkbox
                        </Checkbox>
                        <Checkbox 
                        // onChange={onChange}
                        >
                            Checkbox
                        </Checkbox>
                        <Checkbox 
                        // onChange={onChange}
                        >
                            Checkbox
                        </Checkbox>
                        <Checkbox 
                        // onChange={onChange}
                        >
                            Checkbox
                        </Checkbox>
                        <Checkbox 
                        // onChange={onChange}
                        >
                            Checkbox
                        </Checkbox>
                    </Col> */}
                </Row>
            </div>):stepPage === 1 ?(
            <div style={{ 
                // width: '100%', 
                marginTop: '50px',
                height:'60%'
                 }}>
                <Upload
                    action={'/courtinfo/uploadImg'}
                    listType="text"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    onError={onError}
                    accept=".jpg, .jpeg, .png" // 指定允许上传的文件类型
                    multiple //允许选择多个文件同时上传
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>
            </div>):(
              <div style={{ 
                // width: '100%', 
                marginTop: '50px',
                height:'60%'
                 }}>
                    完成信息添加的页面
                 </div>  
            )}
            {stepPage === 0 ? (<Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2vh'
            }}>
                <Button variant="contained" onClick={() => setStepPage(1)}>下一步</Button>
            </Box>) : stepPage === 1 ? (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2vh'
                }}>
                    <Button variant="outlined" sx={{ marginRight: '25vh' }} onClick={() => setStepPage(0)} >上一步</Button>
                    <Button variant="contained" onClick={() => setStepPage(2)}>下一步</Button>
                </Box>
            ):(
                <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2vh'
            }}>
                <Button variant="contained" sx={{ marginRight: '25vh' }} onClick={showList} >确认</Button>
                <Button variant="outlined" >取消</Button>
            </Box>
            )}

        </Box>
    )
}