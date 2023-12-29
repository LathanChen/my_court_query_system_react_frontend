import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FormControl, Box, Typography, TextField } from '@mui/material';
import { Badge } from 'antd';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
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

    const [value, setValue] = useState(0);

    // 用户信息表单的初始属性
    const userInfo = {
        nickname: "用户昵称",
        age: 20,
        sex: null
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeNickName = (e) => {
        console.log(e.target.value)
    }

    const userInfoOnFinish = (inputUserInfo) => {
        console.log(inputUserInfo)
    }

    return (
        <div>
            <div id="Avatar-And-Username">
                <div id="Avatar">
                    <Avatar {...stringAvatar('Lathan')} />
                </div>
                <div id="Username">
                    <Typography id='Username-Text'>Lathan Chenさん</Typography>
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
                        <Typography variant='subtitle'>
                            一些系统提示信息
                        </Typography>
                    </div>
                    <div id='userInfo-form'>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            layout="horizontal"
                            style={{ maxWidth: 500,textAlign:"left" }}
                            initialValues={userInfo}
                            onFinish={userInfoOnFinish}
                        >
                            {/* name="nickname"对应 initialValues={userInfo}中对象的属性值 */}
                            <Form.Item label="ニックネーム" name="nickname" rules={[{ required: true }]}>
                                <Input
                                    onChange={handleChangeNickName} />
                            </Form.Item>
                            <Form.Item label="年齢" name="age" rules={[{ required: true }]}>
                                <Input
                                    value={userInfo.age}
                                    onChange={handleChangeNickName} />
                            </Form.Item>
                            <Form.Item label="性別" name="sex" rules={[{ required: true }]}>
                                <Radio.Group>
                                    <Radio.Button value="1">男性</Radio.Button>
                                    <Radio.Button value="0">女性</Radio.Button>
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
                                <Input />
                            </Form.Item>
                            <div id='formButton'>
                                <div style={{ width: "40%" }}>
                                    <Button block={true} size='large' type="primary" htmlType="submit">
                                        確認
                                    </Button>
                                </div>
                                <div style={{ width: "40%" }}>
                                    <Button block={true} size='large'>
                                        キャンセル
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    bbbbbbbbbbbbb
                </TabPanel>
            </div>
        </div>
    )
}