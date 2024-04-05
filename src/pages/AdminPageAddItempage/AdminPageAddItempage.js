import React, { useState, useEffect } from 'react';
// import './QueryForm.css'
import { InputLabel, FormControl, Select, MenuItem, Box, Typography, Button } from '@mui/material';
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
    const navigate  = useNavigate();

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
            else{
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
                const response1 = await api.get('/iteminfo')
                const response2 = await api.get('/courtinfo')
                if (response1.data.length !== 0 && response2.data.length !== 0) {
                    setItemnames(response1.data)
                    setCourtnames(response2.data)
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
                    <div style={{ height:'6vh' }}>
                    {showSuccessAlert && (
                   <Alert severity="success" sx={{opacity:'0.8'}}>添加信息成功!</Alert>
                )}
                {errorMsg && (
                    <Alert severity="warning" sx={{opacity:'0.8'}}>{errorMsg}</Alert>
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
                            message:"入力必須項目です" 
                            }]}>
                                <Input/>
                        </Form.Item>
                        <Form.Item label="ニックネーム" name="nickName" rules={[{ required: true }]}>
                                <Input/>
                        </Form.Item>
                        <Form.Item label="ニックネーム" name="nickName" rules={[{ required: true }]}>
                                <Input/>
                        </Form.Item>
                        <Form.Item label="ニックネーム" name="nickName" rules={[{ required: true }]}>
                                <Input/>
                        </Form.Item>
                        <Form.Item label="ニックネーム" name="nickName" rules={[{ required: true }]}>
                                <Input/>
                        </Form.Item>
                    </Form>
                </div>















































                
            </Box>
    )
}