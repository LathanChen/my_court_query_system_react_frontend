import React, { useState, useEffect } from 'react';
// import './QueryForm.css'
import { Box, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import {
    Form,
    Input,
    Radio,
    Select 
} from 'antd';
import axios from 'axios'; //部署用

export default function AdminPageAddItempage(props) {

    const [itemnames, setItemnames] = useState([])
    const [courtnames, setCourtnames] = useState([])
    const [courtOpenItemId, setCourtOpenItemId] = useState('')
    const [courtOpenWeekNum, setCourtOpenWeekNum] = useState('')
    const [courtOpenWeekday, setCourtOpenWeekday] = useState('')
    const [courtOpenCourtId, setCourtOpenCourtId] = useState('')
    const [courtOpenTimeZone, setCourtOpenTimeZone] = useState('')
    const [courtOpenBeginTime, setCourtOpenBeginTime] = useState(null)
    const [courtOpenEndTime, setCourtOpenEndTime] = useState(null)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const changeCourtOpenItemId = (event) => {
        console.log(event.target.value)
        setCourtOpenItemId(event.target.value);
    };
    const changeCourtOpenWeekNum = (event) => {
        console.log(event.target.value)
        setCourtOpenWeekNum(event.target.value);
    };
    const changeCourtOpenWeekday = (event) => {
        console.log(event.target.value)
        setCourtOpenWeekday(event.target.value);
    };
    const changeCourtOpenCourtId = (event) => {
        console.log(event.target.value)
        setCourtOpenCourtId(event.target.value);
    };
    const changeCourtOpenTimeZone = (event) => {
        console.log(event.target.value)
        setCourtOpenTimeZone(event.target.value);
    };
    const changeCourtOpenBeginTime = (data) => {
        console.log(data)
        setCourtOpenBeginTime(data);
    };
    const changeCourtOpenEndTime = (data) => {
        console.log(data)
        setCourtOpenEndTime(data);
    };

    const clearForm = () => {
        setCourtOpenItemId('')
        setCourtOpenWeekNum('')
        setCourtOpenWeekday('')
        setCourtOpenCourtId('')
        setCourtOpenTimeZone('')
        setCourtOpenBeginTime(null)
        setCourtOpenEndTime(null)
    }

    const setTimetoString = timedata => {
        return dayjs(timedata).format('HH:mm');
    };

    const [form] = Form.useForm();

    // 使用useNavigate回到上一页
    const navigate = useNavigate();

    // todo:按取消后回到上一页
    const backToLastPage = () => {
        navigate(-1)
    }

    const params = {
        courtOpenItemId,
        courtOpenCourtId,
        courtOpenWeekNum,
        courtOpenWeekday,
        courtOpenTimeZone,
        courtOpenTime: `${setTimetoString(courtOpenBeginTime)}-${setTimetoString(courtOpenEndTime)}`
    }

    const checkParamsNull = (params) => {
        for (const value of Object.values(params)) {
            if (value === '' || value === null) {
                console.log('true')
                return true;
            }
        }
        return false;
    };

    const insertNewOpenInfo = () => {

        const fetchData = async () => {
            if (courtOpenBeginTime &&
                courtOpenEndTime &&
                courtOpenBeginTime.isAfter(courtOpenEndTime)) {
                // todo:出现"开始时间不能晚于结束时间"提示框
                setErrorMsg('开始时间不能晚于结束时间！')
            }
            else if (checkParamsNull(params)) {
                // todo:出现"开始时间不能晚于结束时间"提示框
                setErrorMsg('请将信息填写完整！')
            }
            else {
                try {
                    //   console.log(setTimetoString(courtOpenBeginTime))
                    const response = await api.post('/courtOpenInfo/setInfo', params)
                    // console.log(response.data)
                    if (response.data.code === 200 && response.data.data === true) {
                        // todo:出现“添加成功”提示框
                        console.log('成功了')
                        setShowSuccessAlert(true)
                        let timer
                        await new Promise((resolve) => {
                            timer = setTimeout(() => {
                                resolve()
                            }, 2000);
                        });
                        console.log(timer)
                        clearTimeout(timer)
                        backToLastPage()
                    }
                }
                catch (error) {
                    console.error(error)
                    setErrorMsg(error)
                }
            }
        }
        fetchData()
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const iteminfoResponse = await api.get('/iteminfo')
                const courtinfoResponse = await api.get('/courtinfo')
                if (iteminfoResponse.data.length !== 0 && courtinfoResponse.data.length !== 0) {
                    setItemnames(iteminfoResponse.data)
                    setCourtnames(courtinfoResponse.data)
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        if (showSuccessAlert) {
            const timer = setTimeout(() => {
                setShowSuccessAlert(false);
            }, 2000); // 2秒后自动隐藏
            return () => clearTimeout(timer);
        }
        if (errorMsg) {
            const timer = setTimeout(() => {
                setErrorMsg('');
            }, 2000); // 2秒后自动隐藏
            return () => clearTimeout(timer);
        }
        fetchData()
    }, [showSuccessAlert, errorMsg])

    return (
        <Box>
            <div style={{ marginTop: '3vh' }}>
                <Typography variant="h5" color="primary">填写完成后点击确认即可添加信息</Typography>
            </div>
            <div>
                <div style={{ height: '6vh' }}>
                    {showSuccessAlert && (
                        <Alert severity="success" sx={{ opacity: '0.8' }}>添加信息成功!</Alert>
                    )}
                    {errorMsg && (
                        <Alert severity="warning" sx={{ opacity: '0.8' }}>{errorMsg}</Alert>
                    )}
                </div>

            </div>

            <div>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    style={{ maxWidth: 1000, textAlign: "left" }}
                >
                    <Form.Item label="種類" name="courtOpenItemId"
                        rules={[{
                            required: true,
                            message: "入力必須項目です"
                        }]}>
                        <Select>
                            {/* <Select.Option value="demo">Demo</Select.Option> */}
                            {(Array.isArray(itemnames)) && itemnames.map((item) =>
                                (<Select.Option value={String(item.itemInfoId)} key={item.itemInfoId}>{item.itemInfoName}</Select.Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="場所" name="courtOpenCourtId"
                    rules={[{
                        required: true,
                        message: "入力必須項目です"
                    }]}>
                        <Select>
                            {/* <Select.Option value="demo">Demo</Select.Option> */}
                            {(Array.isArray(courtnames)) && courtnames.map((item) =>
                                (<Select.Option value={String(item.courtId)} key={item.courtId}>{item.courtName}</Select.Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="週目" name="courtOpenWeekNum"
                    rules={[{
                        required: true,
                        message: "入力必須項目です"
                    }]}>
                        <Select>
                            <Select.Option value="7">毎週</Select.Option>
                            <Select.Option value="1">一週目</Select.Option>
                            <Select.Option value="2">二週目</Select.Option>
                            <Select.Option value="3">三週目</Select.Option>
                            <Select.Option value="4">四週目</Select.Option>
                            <Select.Option value="5">五週目</Select.Option>
                            <Select.Option value="6">六週目</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="ニックネーム" name="nickName" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="ニックネーム" name="nickName" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="ニックネーム" name="nickName" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </div>
















































        </Box>
    )
}