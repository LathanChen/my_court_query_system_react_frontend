import React, { useState,useEffect,useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
// import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {  Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Form,
    Input,
    Radio,
} from 'antd';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { Image } from 'antd';
// import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog'
// // import './QueryForm.css'
// import Slider from "react-slick";
// import Button from '@mui/material/Button';
// import CardMedia from '@mui/material/CardMedia';
// import CircularProgress from '@mui/material/CircularProgress';
// import { Link } from 'react-router-dom';
// import { Col, Row } from 'antd';
// import { Pagination } from 'antd';
// import api from '../../api';
// import Header from "../Header/Header";
import "./GeneralUserPageMain.css"

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
    };
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function GeneralUserPageMain() {

    const theme = useTheme();

    const navigate = useNavigate();

    const [value, setValue] = useState(0);

    const [notEditable, setNotEditable] = useState(true)

    // 创建表单组件的实例对象
    const [form] = Form.useForm();

    const onReset = () => {
        form.setFieldsValue(beforeEditUserInfo);
        setNotEditable(true)
    };


    // 获取store中的用户登录状态
    const isLogin = useSelector(state => state.isLogin);

    const [userNickName,setUserNickName] = useState("")

    const [beforeEditUserInfo,setBeforeEditUserInfo] = useState({})

    // 取得用户信息
    const fetchUserInfo = useCallback(async() => {
        try {
            const userInfoResponse = await api.get('/user/fecthUserInfo')
            console.log(userInfoResponse.data.data)
            setUserNickName(userInfoResponse.data.data.nickName)
            setBeforeEditUserInfo(userInfoResponse.data.data)
            form.setFieldsValue(userInfoResponse.data.data);
        }
        catch (error) {
            navigate('/ErrorMsg')
        }
    },[form,navigate])

    // 取得参加履歴
    const fetchEntryHistory = useCallback(async() => {
        try {
            const userInfoResponse = await api.get('/user/fecthUserInfo')
            console.log(userInfoResponse.data.data)
            setUserNickName(userInfoResponse.data.data.nickName)
            setBeforeEditUserInfo(userInfoResponse.data.data)
            form.setFieldsValue(userInfoResponse.data.data);
        }
        catch (error) {
            navigate('/ErrorMsg')
        }
    },[form,navigate])

    useEffect(() => {
        fetchUserInfo()
    },[fetchUserInfo])
    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // 修改信息并点击确定按钮后触发的事件
    const userInfoOnFinish = (inputUserInfo) => {
        console.log(inputUserInfo)
    }

    return (
        <div>
            <div id="Avatar-And-Username">
                <div id="Avatar">
                    <Avatar {...stringAvatar(userNickName)} />
                </div>
                <div id="Username">
                    <Typography id='Username-Text'>{`${userNickName}さん`}</Typography>
                </div>
            </div>
            <div id="Page-Title">
                <Typography variant='h4'>
                    マイページ
                </Typography>
            </div>
            <div>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="情報設定" {...a11yProps(0)} />
                    <Tab label="参加履歴一覧" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <div id='infoMes'>
                        <Typography variant='h6'>
                            一些系统提示信息
                        </Typography>
                    </div>
                    <div id='userInfo-form'>
                        {/* initialValues={userInfo}确定了表单组件的初始值来自文件中userInfo这个变量 */}
                        <Form
                            form={form}
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            layout="horizontal"
                            style={{ maxWidth: 500, textAlign: "left" }}
                            onFinish={userInfoOnFinish}
                        >
                            {/* name="nickname"对应 initialValues={userInfo}中对象的属性值 */}
                            <Form.Item label="ニックネーム" name="nickName" rules={[{ required: true }]}>
                                <Input
                                    disabled={notEditable} />
                            </Form.Item>
                            <Form.Item label="年齢" name="age" rules={[{ required: true }]}>
                                <Input
                                    disabled={notEditable}
                                />
                            </Form.Item>
                            <Form.Item label="性別" name="sex" rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio.Button value="1" disabled={notEditable}>男性</Radio.Button>
                                    <Radio.Button value="0" disabled={notEditable}>女性</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input disabled={notEditable} />
                            </Form.Item>
                            <div id='formButton'>
                                <div style={{ width: "40%" }}>
                                    {notEditable ? <Button block={true} size='large' type="primary" onClick={() => setNotEditable(false)}>
                                        編集
                                    </Button>
                                        :
                                        <Button block={true} size='large' type="primary" htmlType="submit">
                                            確定
                                        </Button>}
                                </div>
                                <div style={{ width: "40%" }}>
                                    <Button block={true} size='large' onClick={onReset}>
                                        キャンセル
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <div>
                        <Typography id="Entry-History-Title" variant='h6'>
                            参加履歴一覧
                        </Typography>
                    </div>
                    <div id="Entry-History-Infos">
                        <div id="Entry-History-Info">
                            <div id="Entry-History-Info-Title">
                                <Typography id="Entry-History-Info-Title-Text" variant='h6'>
                                    参加済み
                                </Typography>
                            </div>
                            <div id="Entry-History-Info-Detail">
                                <Typography variant='h6'>
                                    XXXバス
                                </Typography>
                                <Typography variant='subtitle2'>
                                    申込日：
                                </Typography>
                                <Typography variant='subtitle2'>
                                    参加日：
                                </Typography>
                                <Typography variant='subtitle2'>
                                    場　所：
                                </Typography>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </div>
        </div>
    )
}