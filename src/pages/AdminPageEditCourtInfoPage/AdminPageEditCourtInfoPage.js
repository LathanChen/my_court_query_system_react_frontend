import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Steps, Col, Row, Input, Checkbox, Typography, Result, Image } from 'antd';
import Alert from '@mui/material/Alert';
import { SmileOutlined } from '@ant-design/icons';
import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
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

const { Text } = Typography;

export default function AdminPageEditCourtInfoPage(props) {

    const routerparam = useParams()

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const [courtInfos, setCourtInfos] = useState({
        courtId: routerparam.courtInfoId,
        courtName: '',
        courtAdress: '',
        courtTelNum: '',
        courtStation: '',
        courtFromStationDistance: null,
    })

    const [courtNameError, setCourtNameError] = useState('')

    const [courtAdressError, setCourtAdressError] = useState('')

    const [courtTelNumError, setCourtTelNumError] = useState('')

    const [courtFromStationDistanceError, setCourtFromStationDistanceError] = useState('')

    const [successAlert,setSuccessAlert] = useState(false)

    // 进入页面时，获取数据
    const getCourtInfo = async (courtId) => {
        const response = await api.get(`/courtinfo/getCourtInfoAndImgsById/${courtId}`)
        setCourtInfos(response.data.courtInfos)
        if (response.data.fileList.length >= 0) {
            setFileList(response.data.fileList.map(file => {
                console.log(file)
                return { url: file }
            }))
        }

    }

    useEffect(() => {
        getCourtInfo(routerparam.courtInfoId)
    }, [])


    // 对输入的数据进行检查
    const checkCourtInfo = () => {
        // 恢复初始值
        setCourtNameError('')
        setCourtAdressError('')
        setCourtTelNumError('')
        setCourtFromStationDistanceError('')
        let courtNameErrorFlg = false
        let courtAdressErrorFlg = false
        let courtTelNumErrorFlg = false
        let courtFromStationDistanceErrorFlg = false
        // 1、名称和地址不能为空
        if (courtInfos.courtName === '') {
            setCourtNameError('名称不能为空！')
            courtNameErrorFlg = true
        }
        if (courtInfos.courtAdress === '') {
            setCourtAdressError('地址不能为空！')
            courtAdressErrorFlg = true
        }
        // 2、电话应该全部为数字且开头为0
        // 使用正则表达式判断输入的号码是否满足日本的电话格式
        if (!(/^0\d{9}$/.test(courtInfos.courtTelNum))) {
            setCourtTelNumError('电话号码有误！')
            courtTelNumErrorFlg = true
        }
        // 3、徒歩XX分，XX应该为60以内小数
        if (courtInfos.courtStation !== '' && courtInfos.courtFromStationDistance !== '') {
            if (!(/^(?:[1-5]?\d|0)$/.test(courtInfos.courtFromStationDistance))) {
                setCourtFromStationDistanceError('数字不能超过60！')
                courtFromStationDistanceErrorFlg = true
            }
        }
        else {
            if (courtInfos.courtFromStationDistance === 0) {
            }
            else if (courtInfos.courtFromStationDistance === '') {

            }
            else {
                setCourtFromStationDistanceError('请先输入站名！')
                courtFromStationDistanceErrorFlg = true
            }
        }

        console.log(courtNameErrorFlg)
        console.log(courtAdressErrorFlg)
        console.log(courtTelNumErrorFlg)
        console.log(courtFromStationDistanceErrorFlg)

        if (courtNameErrorFlg ||
            courtAdressErrorFlg ||
            courtTelNumErrorFlg ||
            courtFromStationDistanceErrorFlg) {
            return false
        }
        else {
            return true
        }
    }

    const [uploadImgsError, setUploadImgsError] = useState('')

    const sendNewCourtInfoAndImgs = () => {
        setUploadImgsError('')
        let errorFlg = false
        for (const imgfile of fileList) {
            // 原有的设计里,数据库中的图片名称就和图片url相同
            imgfile.imgName = imgfile.url
            if (imgfile.status === 'error') {
                errorFlg = true
                setUploadImgsError('请先删除错误的文件！')
                break
            }
        }
        if (!errorFlg && checkCourtInfo()) {
            sendCourtInfoAndImgs()
        }
    }

    const navigate = useNavigate();
    // 设置参数，并向后台发送请求
    const sendCourtInfoAndImgs = async () => {
        const courtNames = fileList.map((file) => {
            return file.imgName
        })
        const courtInfoUrls = fileList.map((value) => {
            return value.url
        })
        const params = {
            courtInfos,
            courtNames,//其实是图片名称
            courtInfoUrls,
        }

        try {
            console.log(params)
            const response = await api.post('/courtinfo/updateCourtInfoAndImgs', params)
            console.log(response.data)
            if (response.data.code === 200) {
                // todo:页面显示添加成功
                setSuccessAlert(true)
                let timer
                await new Promise((resolve) => {
                    setTimeout(() => {
                        setSuccessAlert(false)
                        resolve()
                    }, 2000)
                })
                clearTimeout(timer)
                navigate('/adminpage/courtinfolist')
            }
            else {
            }
        }
        catch (error) {
            console.error(error)
        }


    }

    const handleChangeCourtAdress = (e) => {
        setCourtInfos({
            ...courtInfos,
            courtAdress: e.target.value
        })
    }

    const handleChangeCourtTelNum = (e) => {
        setCourtInfos({
            ...courtInfos,
            courtTelNum: e.target.value
        })
    }

    const handleChangeCourtStation = (e) => {
        setCourtInfos({
            ...courtInfos,
            courtStation: e.target.value
        })
    }

    const handleChangeCourtFromStationDistance = (e) => {
        console.log(e.target.value)
        setCourtInfos({
            ...courtInfos,
            courtFromStationDistance: e.target.value
        })
    }

    const handleCancel = () => setPreviewOpen(false);

    // 当点击页面上的预览按钮时触发
    const handlePreview = async (file) => {
        console.log(file)
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

    const backToPage1 = () => {
        setCourtInfos({
            courtName: '',
            courtAdress: '',
            courtTelNum: '',
            courtStation: '',
            courtFromStationDistance: 0,
        })
        setFileList([])
        setCourtNameError('')
        setCourtAdressError('')
        setCourtTelNumError('')
        setCourtFromStationDistanceError('')
    }

    const onError = (error) => {
        console.log(error)
    };

    return (
        <Box sx={{
            // 开启flex布局
            // display: 'flex',
            // 改变felx主轴方向
            // flexDirection: 'column',
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
            // border: '1px solid skyblue',
            overflow: 'auto'
        }}>
            <div style={{height:'8vh'}}>
                {successAlert && <Alert severity="success">修改成功！</Alert>}
            </div>
            <div style={{ margin: 'auto', width: '90%', height: '28vh' }}>
                <Text type="danger" >{uploadImgsError}</Text>
                <Upload
                    action={'/courtinfo/uploadImg'}
                    listType="picture-card"
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
            </div>
            <Row align="middle">
                <Col span={3} style={{ textAlign: 'center', height: '24px' }}>
                </Col>
                <Col span={21}>
                    {courtNameError && <Text type="danger">{courtNameError}</Text>}
                </Col>
                <Col span={3} style={{ textAlign: 'center' }}>
                    *名称：
                </Col>
                <Col span={21}>
                    <p>{courtInfos.courtName}</p>
                </Col>
                <Col span={3} style={{ textAlign: 'center', height: '24px' }}>
                </Col>
                <Col span={21}>
                    {courtAdressError && <Text type="danger">{courtAdressError}</Text>}
                </Col>
                <Col span={3} style={{ textAlign: 'center' }}>
                    *地址：
                </Col>
                <Col span={21} style={{}}>
                    <Input
                        placeholder="请输入地址"
                        value={courtInfos.courtAdress}
                        onChange={handleChangeCourtAdress}
                    />
                </Col>
                <Col span={3} style={{ textAlign: 'center' }}>
                </Col>
                <Col span={5} style={{}}>
                    {courtTelNumError && <Text type="danger">{courtTelNumError}</Text>}
                </Col>
                <Col span={4} style={{ textAlign: 'center' }}>
                </Col>
                <Col span={6} style={{}}>

                </Col>
                <Col span={6} style={{ textAlign: 'center', height: '24px' }}>
                    {courtFromStationDistanceError && <Text type="danger">{courtFromStationDistanceError}</Text>}
                </Col>
                <Col span={3} style={{ textAlign: 'center' }}>
                    电话：
                </Col>
                <Col span={5} style={{}}>
                    <Input
                        placeholder="请输入电话号码"
                        onChange={handleChangeCourtTelNum}
                        value={courtInfos.courtTelNum}
                    />
                </Col>
                <Col span={4} style={{ textAlign: 'center' }}>
                    最寄り駅：
                </Col>
                <Col span={6} style={{}}>
                    <Input
                        placeholder="请输入车站名"
                        onChange={handleChangeCourtStation}
                        value={courtInfos.courtStation}
                    />
                </Col>
                <Col span={3} style={{ textAlign: 'center', }}>
                    徒歩：
                </Col>
                <Col span={2} style={{}}>
                    <Input
                        onChange={handleChangeCourtFromStationDistance}
                        value={courtInfos.courtFromStationDistance}
                    />
                </Col>
                <Col span={1} style={{}}>
                    分
                </Col>
            </Row>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '5vh'
            }}>
                <Button variant="contained" onClick={sendNewCourtInfoAndImgs} >确认</Button>
                <Button variant="outlined" onClick={backToPage1} >取消</Button>
            </Box>

        </Box>
    )
}