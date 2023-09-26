import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Steps, Col, Row, Input, Checkbox, Typography, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
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

const { Text } = Typography;

export default function AdminPageAddItempage(props) {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    // 页面上的进度步骤
    const [stepPage, setStepPage] = useState(0)

    const [courtInfos, setCourtInfos] = useState({
        courtName: '',
        courtAdress: '',
        courtTelNum: '',
        courtStation: '',
        courtFromStationDistance: null,
    })

    const handleChangeCourtName = (e) => {
        setCourtInfos({
            ...courtInfos,
            courtName: e.target.value
        })
    }

    const [courtNameError, setCourtNameError] = useState('')

    const [courtAdressError, setCourtAdressError] = useState('')

    const [courtTelNumError, setCourtTelNumError] = useState('')

    const [courtFromStationDistanceError, setCourtFromStationDistanceError] = useState('')

    /*
    @value:画面上输入的内容的值
    @event:本次事件的对象
    */
    const checkSameCourtName = async (value, event) => {
        setCourtNameError('')
        checkSameCourtNameFetch(value,false)
    }

    /*
    @value:画面上输入的courtName的值
    @isSetTimeout:事件是否由页面上的 下一步 这个按钮触发
    */
    const checkSameCourtNameFetch = async (courtName, isNextPageButton) => {
        const params = { courtName }
        let flg = false
        try {
            const response = await axios.get('/courtinfo/checkSameCourtName', { params })
            // 数据库中已经有该场地的数据
            console.log(response.data)
            if (response.data === true) {
                setCourtNameError('该名称已存在！')
                flg = true
            }
            else {
                if (isNextPageButton){
                }
                else {
                    setCourtNameError('检测正常，该场地还未被收录！')
                }
                
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {            
            if (!isNextPageButton) {
                let timer
                await new Promise((resolve) => {
                    timer = setTimeout(() => {
                        setCourtNameError('')
                        // console.log(timer)
                        // 调用 resolve() 之后，Promise 的状态会变为 resolved
                        resolve()
                    }, 3000)
                })
                // 销毁定时器
                clearTimeout(timer)
            }
        }
        return flg
    }

    // 对第一页输入的数据进行检查
    const CheckPage1Datas = async () => {
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
        // 2、电话应该全部为数字
        // 使用正则表达式判断输入的号码是否满足日本的电话格式
        if (!(/^0\d{9}$/.test(courtInfos.courtTelNum))) {
            setCourtTelNumError('电话号码有误！')
            courtTelNumErrorFlg = true
        }
        // 3、徒歩XX分，XX应该为60以内小数
        if (courtInfos.courtStation !== '' && courtInfos.courtFromStationDistance !=='') {
            if (!(/^(?:[1-5]?\d|0)$/.test(courtInfos.courtFromStationDistance))) {
                setCourtFromStationDistanceError('数字不能超过60！')
                courtFromStationDistanceErrorFlg = true
            }
        }
        else {
            if (courtInfos.courtFromStationDistance === 0) {
            }
            else if (courtInfos.courtFromStationDistance ===''){
                
            }
            else {
                setCourtFromStationDistanceError('请先输入站名！')
                courtFromStationDistanceErrorFlg = true
            }
        }
        // 4、确认场地名是否已登录
        // checkSameCourtNameFetch是一个异步函数，所以也要先使用await来等待结果返回后再进行下面的判断
        const sameCourtNameFlg = await checkSameCourtNameFetch(courtInfos.courtName,true)
        console.log(courtNameErrorFlg)
        console.log(courtAdressErrorFlg)
        console.log(courtTelNumErrorFlg)
        console.log(courtFromStationDistanceErrorFlg)
        console.log(sameCourtNameFlg)

        if (courtNameErrorFlg ||
            courtAdressErrorFlg ||
            courtTelNumErrorFlg ||
            courtFromStationDistanceErrorFlg ||
            sameCourtNameFlg) {
            }
        else {
            setStepPage(1)
        }
    }

        const [uploadImgsError,setUploadImgsError] = useState('')
        // 对第二页输入的数据进行检查
        const CheckPage2Datas = () => {
            setUploadImgsError('')
            let errorFlg = false
            for (const imgfile of fileList){
                if (imgfile.status === 'error'){
                    errorFlg = true
                    setUploadImgsError('请先删除错误的文件！')
                    break
                }
            }
            if (!errorFlg){
                sendCourtInfoAndImgs()
            }
        }

        // 设置参数，并向后台发送请求
        const sendCourtInfoAndImgs = async () => {
            let params = {}
            if (fileList){
                const courtNames = fileList.map((value) => {
                    return value.response.data
                })
                const courtInfoUrls = fileList.map((value) => {
                    return value.url
                })
                params = {
                    courtInfos,
                    courtNames,
                    courtInfoUrls
                }
            }
            try {
                const response = await api.post('/courtinfo/setCourtInfoAndImgs',params)
                if (response.data.code === 200) {
                    setStepPage(2)
                }
                else {
                }
            }
            catch (error){
                console.error(error)
            }
            
            
        }

    const checkAndToPage2 = () => {
        CheckPage1Datas()
        console.log(courtInfos)
    }

    const handleChangeCourtAddress = (e) => {
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
        console.log(e.target.value === '')
        setCourtInfos({
            ...courtInfos,
            courtFromStationDistance: e.target.value
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
        console.log(fileList)
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
        setStepPage(0)
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
            {stepPage === 0 ? (<div style={{ width: '100%', marginTop: '50px', height: '60%' }}>
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
                        <Search
                            placeholder="请输入场馆名称"
                            value={courtInfos.courtName}
                            onChange={handleChangeCourtName}
                            onSearch={checkSameCourtName}
                        />
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
                            onChange={handleChangeCourtAddress}
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
            </div>) : stepPage === 1 ? (
                <div style={{
                    // width: '100%', 
                    marginTop: '50px',
                    height: '60%'
                }}>
                    <div style={{textAlign:'center',height:'24px'}}><Text type="danger" >{uploadImgsError}</Text></div>
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
                </div>) : (
                <div style={{
                    // width: '100%', 
                    marginTop: '50px',
                    height: '60%'
                }}>
                    <Result
                        icon={<SmileOutlined />}
                        title="信息添加成功！"
                    />
                </div>
            )}
            {stepPage === 0 ? (<Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2vh'
            }}>
                <Button variant="contained" onClick={checkAndToPage2}>下一步</Button>
            </Box>) : stepPage === 1 ? (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2vh'
                }}>
                    <Button variant="outlined" sx={{ marginRight: '25vh' }} onClick={() => setStepPage(0)} >上一步</Button>
                    <Button variant="contained" onClick={CheckPage2Datas}>下一步</Button>
                </Box>
            ) : (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2vh'
                }}>
                    <Button variant="contained" onClick={backToPage1} >继续添加</Button>
                </Box>
            )}

        </Box>
    )
}