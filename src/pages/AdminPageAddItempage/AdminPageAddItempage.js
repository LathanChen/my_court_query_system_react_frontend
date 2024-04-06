import React, { useState, useEffect, useCallback } from 'react';
// import './QueryForm.css'
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import {
    Form,
    Button,
    Select,
    TimePicker,
} from 'antd';
// import axios from 'axios'; //部署用
import "./AdminPageAddItempage.css"

export default function AdminPageAddItempage(props) {

    const [itemnames, setItemnames] = useState([])
    const [courtnames, setCourtnames] = useState([])
    const [courtOpenBeginTime, setCourtOpenBeginTime] = useState(null)
    const [courtOpenEndTime, setCourtOpenEndTime] = useState(null)
    const [alertMsg, setAlertMsg] = useState("");



    const [form] = Form.useForm();

    // 使用useNavigate回到上一页
    const navigate = useNavigate();

    const insertNewOpenInfo = useCallback(async (params) => {
        try {
            //   console.log(setTimetoString(courtOpenBeginTime))
            const response = await api.post('/courtOpenInfo/setInfo', params)
            // console.log(response.data)
            if (response.data.code === 200 && response.data.data === true) {
                // todo:出现“添加成功”提示框
                console.log('成功了')
                setAlertMsg("追加しました！")
                let timer
                await new Promise((resolve) => {
                    timer = setTimeout(() => {
                        resolve()
                    }, 2000);
                });
                clearTimeout(timer)
                navigate(-1)
            }
        }
        catch (error) {
            console.error(error)
        }
    }, [navigate])

    const submitForm = (newCourtOpenInfo) => {
        console.log(newCourtOpenInfo)
        const { courtOpenBeginAndEndTime, ...newCourtOpenInfoWithoutBeginAndEndTime } = newCourtOpenInfo
        const params = {
            ...newCourtOpenInfoWithoutBeginAndEndTime,
            courtOpenTime: `${courtOpenBeginTime}-${courtOpenEndTime}`
        }
        console.log(params)
        insertNewOpenInfo(params)
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
        fetchData()
    }, [])

    return (
        <div>
            <div id='alert-container'>
                {alertMsg && <Alert severity="success" sx={{ opacity: '0.8' }}>{alertMsg}</Alert>}
            </div>
            <div id='add-item-container'>
                <div>
                    <Form
                        form={form}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        layout="horizontal"
                        style={{ maxWidth: 500, textAlign: "left" }}
                        onFinish={submitForm}
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
                        <Form.Item label="曜日" name="courtOpenWeekday"
                            rules={[{
                                required: true,
                                message: "入力必須項目です"
                            }]}>
                            <Select>
                                <Select.Option value="1">月曜日</Select.Option>
                                <Select.Option value="2">火曜日</Select.Option>
                                <Select.Option value="3">水曜日</Select.Option>
                                <Select.Option value="4">木曜日</Select.Option>
                                <Select.Option value="5">金曜日</Select.Option>
                                <Select.Option value="6">土曜日</Select.Option>
                                <Select.Option value="7">日曜日</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="時間帯" name="courtOpenTimeZone"
                            rules={[{
                                required: true,
                                message: "入力必須項目です"
                            }]}>
                            <Select>
                                <Select.Option value="1">午前</Select.Option>
                                <Select.Option value="2">午後</Select.Option>
                                <Select.Option value="3">夜</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="courtOpenBeginAndEndTime"
                            label="開始、終了時間"
                            rules={[{
                                required: true,
                                message: "入力必須項目です"
                            }]}
                            validateTrigger="onChange"
                        >
                            <TimePicker.RangePicker
                                format="HH:mm"
                                onChange={(time, timeString) => {
                                    console.log(timeString)
                                    setCourtOpenBeginTime(timeString[0]);
                                    setCourtOpenEndTime(timeString[1])
                                }}
                                minuteStep="15"
                                secondStep="60"
                                status
                            />
                        </Form.Item>
                        <div id='button-container'>
                            <div style={{ width: "20%" }}>
                                <Button block={true} size='large' type="primary" htmlType="submit">
                                    確定
                                </Button>
                            </div>
                            <div style={{ width: "20%" }}>
                                <Button block={true} size='large' onClick={() => { form.resetFields() }}>
                                    キャンセル
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}