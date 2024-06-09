import React, { useState, useCallback, useEffect, useMemo, useContext, createContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Calendar, Typography, Button, Modal, Form, Input, Select, TimePicker } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import api from '../../api';
import dayjs from 'dayjs';
import './EventManagerment.css'
const { Title, Text } = Typography;

const EventCalendarContext = createContext(null);

const DraggableEvent = ({ event, handlerButtonShow }) => {

    const { itemnames, courtnames } = useContext(EventCalendarContext);

    const [form] = Form.useForm();

    const { setCllGetEventInfosByUserIdApiFlg,getEventInfoList,updateEventInfo } = useContext(EventCalendarContext);

    const [eventForForm, setEventForForm] = useState()

    const [deleteButtonShow, setDeleteButtonShow] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [confirmLoading, setConfirmLoading] = useState(false);

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const [modalSettings, setModalSettings] = useState({
        type: "",
        title: "",
        method: null
    });

    // 使用 useDrag 钩子，使其变得可拖动。我们需要定义拖动类型（EVENT）和拖动的内容（item）。
    const [, drag] = useDrag(() => ({
        // 在 react-dnd 中，拖动类型（type）是一个字符串，用于标识可以拖动的项目和可以接受的放置区域。它用于确保只有匹配的拖动类型可以被放置到相应的区域。
        // 拖动类型是一个字符串，用于标识拖动项目的类别。这个字符串可以是任意的，只要它在项目和放置区域中一致即可。
        // 拖动类型在 react-dnd 中是非常重要的，因为它提供了以下几个好处：
        // 类型安全：通过类型匹配，可以确保只有符合类型的项目可以被放置到相应的区域，防止错误操作。
        // 灵活性：不同的类型可以对应不同的处理逻辑，使得拖放操作更加灵活和可扩展。
        // 代码清晰：通过明确的类型定义，可以使代码更加清晰和易于维护。
        type: 'EVENT',
        item: { event },
        // 拖动结束时，设置之前的日期单元格按钮为不显示
        end: () => {
            handlerButtonShow(false);
        }
    }));

    useEffect(() => {
        setEventForForm({
            ...event,
            eventOpenTime: [
                dayjs(event.eventOpenTime.split("-")[0], "HH:mm"),
                dayjs(event.eventOpenTime.split("-")[1], "HH:mm"),
            ],
            onlineEventEnrollment: event.entryInfoList.length
        })
    }, [event])

    const setDeleteModal = () => {
        setModalOpen(true)
        setModalSettings({
            type: "DELETE",
            title: "このイベント削除しますか？",
            method: deleteEvent
        })
    }

    const deleteEvent = async () => {
        setConfirmLoading(true);
        console.log(event.eventInfoId);
        try {
            const response = await api.delete(`/eventInfo/deleteEventInfoByEventInfoId/${event.eventInfoId}`);
            setConfirmLoading(false);
            setModalOpen(false);
            console.log(response.data);
            if (response.data.code === 200) {
                setCllGetEventInfosByUserIdApiFlg(true);
            }
            else if (response.data.code === 404) {

            }
        }
        catch (e) {
            console.error(e);
        }
    }

    const editEventInfo = () => {
        // 在删除modal弹出时，由于双击事件会触发更新modal的弹出，所以这里通过这个判定直接return
        if (modalOpen) {
            return;
        }
        console.log(event);
        setModalOpen(true);
        setModalSettings({
            type: "UPDATE",
            title: "イベント更新",
            method: updateInfo
        })
    }

    const setTimeRange = (timezoneValue) => {
        switch (timezoneValue) {
            // 午前
            case "1": {
                const startTime = '9:00';
                const endTime = '12:00';
                form.setFieldsValue({
                    eventOpenTime: [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')]
                });
                break;
            }
            // 午後1
            case "2": {
                const startTime = '12:30';
                const endTime = '15:00';
                form.setFieldsValue({
                    eventOpenTime: [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')]
                });
                break;
            }
            // 午後2
            case "3": {
                const startTime = '15:30';
                const endTime = '18:00';
                form.setFieldsValue({
                    eventOpenTime: [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')]
                });
                break;
            }
            // 夜
            case "4": {
                const startTime = '18:30';
                const endTime = '21:00';
                form.setFieldsValue({
                    eventOpenTime: [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')]
                });
                break;
            }
            default: {
                return;
            }
        }
    };

    const updateInfo = async() => {
        let editedEventInfo = form.getFieldsValue();
        // 两个对象中有相同属性,在合并的过程中，后一个对象的属性值会覆盖前一个对象的相同属性值。
        editedEventInfo = {
            ...event,
            ...editedEventInfo,
            eventOpenTime:`${dayjs(editedEventInfo?.eventOpenTime?.[0]).format('HH:mm')}-${dayjs(editedEventInfo?.eventOpenTime?.[1]).format('HH:mm')}`,
            eventUpdateTime:new Date()
        };
        console.table(editedEventInfo);
        setConfirmLoading(true);
        await updateEventInfo(editedEventInfo);
        setConfirmLoading(false);
        setModalOpen(false);
        await getEventInfoList();
    }

    const onValuesChange = (changedValues, allValues) => {
        // 如果 eventMaxEnrollment 变化，重新验证 eventEnrollment
        if (changedValues.eventMaxEnrollment || changedValues.eventEnrollment) {
            form.validateFields(['eventMaxEnrollment']);
            form.validateFields(['eventEnrollment']);
        }
    };

    return (
        // stopPropagation:阻止事件冒泡,防止双击事件时触发日期单元格的点击事件,特别是当本日期单元格不属于当前表示月时,不阻止事件冒泡会导致日历页面的变化
        <div id='eventCalendar-eventInfo' onMouseEnter={() => setDeleteButtonShow(true)} onMouseLeave={() => setDeleteButtonShow(false)} onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: event.itemDivColor }} ref={drag} onDoubleClick={editEventInfo}>
            <Modal
                title={modalSettings.title}
                open={modalOpen}
                onOk={modalSettings.method}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    setModalOpen(false);
                    form.resetFields();
                }}
                okButtonProps={{ disabled: isSubmitDisabled }}
            >
                {modalSettings.type === "UPDATE" &&
                    <div>
                        {/* 活动更新表单 */}
                        <Form
                            form={form}
                            initialValues={eventForForm}
                            onValuesChange={onValuesChange}
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: 800, textAlign: "left" }}
                        >
                            <Form.Item label="種類" name="eventItemId"
                                rules={[{
                                    required: true,
                                    message: "入力必須項目です"
                                }]}>
                                <Select>
                                    {/* <Select.Option value="demo">Demo</Select.Option> */}
                                    {(Array.isArray(itemnames)) && itemnames.map((item) =>
                                        (<Select.Option value={item.itemInfoId} key={item.itemInfoId}>{item.itemInfoName}</Select.Option>))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="場所" name="eventCourtId"
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
                            <Form.Item
                                label="募集人数"
                                name="eventMaxEnrollment"
                                rules={[
                                    { required: true, message: '入力必須項目です' },
                                    {
                                        validator: (_, value) => {
                                            console.log(Number(value));
                                            console.log(Number(form.getFieldsValue().eventEnrollment) + Number(form.getFieldsValue().onlineEventEnrollment));
                                            if (Number(value) < Number(form.getFieldsValue().eventEnrollment) + Number(form.getFieldsValue().onlineEventEnrollment)) {
                                                setIsSubmitDisabled(true);
                                                return Promise.reject(new Error('募集済み人数は予定人数を超えます！'));
                                            }
                                            setIsSubmitDisabled(false);
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="オフライン募集済み人数"
                                name="eventEnrollment"
                                rules={[
                                    { required: true, message: '入力必須項目です' },
                                    {
                                        validator: (_, value) => {
                                            console.log(Number(value) + form.getFieldsValue().onlineEventEnrollment);
                                            console.log(form.getFieldsValue().eventMaxEnrollment);
                                            if (Number(value) + form.getFieldsValue().onlineEventEnrollment > form.getFieldsValue().eventMaxEnrollment ) {
                                                setIsSubmitDisabled(true);
                                                return Promise.reject(new Error('募集済み人数は予定人数を超えます！'));
                                            }
                                            setIsSubmitDisabled(false);
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="オンライン募集済み人数"
                                name="onlineEventEnrollment"
                                rules={[{ required: true, message: '入力必須項目です' }]}
                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item label="時間帯" name="eventOpenTimeZone"
                                rules={[{
                                    required: true,
                                    message: "入力必須項目です"
                                }]}>
                                <Select onChange={setTimeRange}>
                                    <Select.Option value="1">午前</Select.Option>
                                    <Select.Option value="2">午後1</Select.Option>
                                    <Select.Option value="3">午後2</Select.Option>
                                    <Select.Option value="4">夜</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="eventOpenTime"
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
                                        // setEventBeginTime(timeString[0]);
                                        // setEventEndTime(timeString[1])
                                    }}
                                    minuteStep="15"
                                    secondStep="60"
                                    status
                                />
                            </Form.Item>
                        </Form>
                    </div>}
            </Modal>
            <div style={{ display: deleteButtonShow && 'flex', justifyContent: 'space-between' }}>
                {deleteButtonShow && <Button id="insertEvent-Button" type="primary" danger size="small" shape="circle" onClick={setDeleteModal}>
                    -
                </Button>}
                <Title level={5} style={{ margin: "0", color: "black" }}>{event.organizer.organizerName.length > 5 ? `${event.organizer.organizerName.slice(0, 5)}...` : event.organizer.organizerName}</Title>
            </div>
            <div>
                <Text style={{ fontWeight: 'bold' }}>{event.eventOpenTime}</Text>
            </div>
        </div>
    );
};

const DroppableDateCell = ({ date, events, onDropEvent, allowInsertEventButton }) => {

    // 错误的写法:useDrop 钩子没有将 date 作为依赖项，因此在初始渲染后，date 的值不会更新，导致 onDrop 方法中的 date 仍然是旧的值。
    // 当切换月份或年份时，虽然 DroppableDateCell 组件会重新渲染，但 useDrop 钩子不会重新注册，因为它没有被告知 date 发生了变化。

    // ------------------------------------------------------------------错误的写法------------------------------------------------------------------
    // DroppableDateCell 组件使用 useDrop 钩子，使其能够接收拖拽的事件。当事件被放置到这个单元格上时，我们更新事件的日期。
    // const [{ isOver }, drop] = useDrop(() => ({
    //     accept: 'EVENT',
    //     drop: (item) => onDropEvent(item.event, date),
    //     collect: (monitor) => ({
    //         isOver: monitor.isOver(),
    //     }),
    // }));
    // ------------------------------------------------------------------错误的写法------------------------------------------------------------------

    // useDrop 钩子应该依赖于 date，以确保在每次 date 变化时 drop 行为能够使用最新的 date。这可以通过将 date 传递给 useDrop 的依赖项数组来实现。

    const { itemnames, courtnames } = useContext(EventCalendarContext);

    const [form] = Form.useForm();

    const [confirmLoading, setConfirmLoading] = useState(false);

    const [buttonShow, setButtonShow] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const setTimeRange = (timezoneValue) => {
        switch (timezoneValue) {
            // 午前
            case "1": {
                const startTime = '9:00';
                const endTime = '12:00';
                form.setFieldsValue({
                    eventOpenTime: [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')]
                });
                break;
            }
            // 午後1
            case "2": {
                const startTime = '12:30';
                const endTime = '15:00';
                form.setFieldsValue({
                    eventOpenTime: [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')]
                });
                break;
            }
            // 午後2
            case "3": {
                const startTime = '15:30';
                const endTime = '18:00';
                form.setFieldsValue({
                    eventOpenTime: [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')]
                });
                break;
            }
            // 夜
            case "4": {
                const startTime = '18:30';
                const endTime = '21:00';
                form.setFieldsValue({
                    eventOpenTime: [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')]
                });
                break;
            }
            default: {
                return;
            }
        }
    };

    const handlerButtonShow = (value) => {
        setButtonShow(value);
        console.log(date);
    }

    const [{ isOver }, drop] = useDrop({
        accept: 'EVENT',
        drop: (item) => {
            console.log("Dropped event:", item.event);
            console.log("On date:", date.format('YYYY-MM-DD'));
            // 拖动完成时触发事件
            // console.log(date.format('YYYY-MM-DD').toString())
            // console.log(date.format('YYYY-MM-DD').toString() === dayjs(item.event.eventOpenDay))
            console.log(date.format('YYYY-MM-DD').toString() === item.event.eventOpenDay)
            if (date.format('YYYY-MM-DD').toString() === item.event.eventOpenDay) {
                return;
            }
            else {
                onDropEvent(item.event, date);
            }
            // setButtonShow(true);

        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }, [date]);

    const openInsertEventModal = () => {
        console.log("按钮点击事件！");
        setModalOpen(true);
    };

    const insertEventInfo = () => {
        console.table(form.getFieldsValue());
    }

    const onValuesChange = (changedValues, allValues) => {
        // 如果 eventMaxEnrollment 变化，重新验证 eventEnrollment
        if (changedValues.eventMaxEnrollment || changedValues.eventEnrollment) {
            form.validateFields(['eventMaxEnrollment']);
            form.validateFields(['eventEnrollment']);
        }
    };

    return (
        <div onMouseEnter={() => setButtonShow(true)} onMouseLeave={() => setButtonShow(false)} key={date.toString()} ref={drop} style={{ backgroundColor: isOver ? 'lightgreen' : 'white', border: "2px solid #E0F7FA", margin: "1px" }}>
            <Modal
                title={`${dayjs(date).format('YYYY-MM-DD')}新規イベント`}
                open={modalOpen}
                onOk={insertEventInfo}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    setModalOpen(false);
                    form.resetFields();
                }}
                okButtonProps={{ disabled: isSubmitDisabled }}
            >
                <div>
                {/* 活动创建表单 */}
                <Form
                            form={form}
                            onValuesChange={onValuesChange}
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: 800, textAlign: "left" }}
                        >
                            <Form.Item label="種類" name="eventItemId"
                                rules={[{
                                    required: true,
                                    message: "入力必須項目です"
                                }]}>
                                <Select>
                                    {/* <Select.Option value="demo">Demo</Select.Option> */}
                                    {(Array.isArray(itemnames)) && itemnames.map((item) =>
                                        (<Select.Option value={item.itemInfoId} key={item.itemInfoId}>{item.itemInfoName}</Select.Option>))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="場所" name="eventCourtId"
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
                            <Form.Item
                                label="募集人数"
                                name="eventMaxEnrollment"
                                rules={[
                                    { required: true, message: '入力必須項目です' },
                                    {
                                        validator: (_, value) => {
                                            console.log(Number(value));
                                            if (Number(value) < form.getFieldsValue().eventEnrollment) {
                                                setIsSubmitDisabled(true);
                                                return Promise.reject(new Error('募集済み人数は予定人数を超えます！'));
                                            }
                                            setIsSubmitDisabled(false);
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="オフライン募集済み人数"
                                name="eventEnrollment"
                                rules={[
                                    { required: true, message: '入力必須項目です' },
                                    {
                                        validator: (_, value) => {
                                            console.log(Number(value));
                                            console.log(form.getFieldsValue().eventMaxEnrollment);
                                            if (Number(value)  > form.getFieldsValue().eventMaxEnrollment) {
                                                setIsSubmitDisabled(true);
                                                return Promise.reject(new Error('募集済み人数は予定人数を超えます！'));
                                            }
                                            setIsSubmitDisabled(false);
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="時間帯" name="eventOpenTimeZone"
                                rules={[{
                                    required: true,
                                    message: "入力必須項目です"
                                }]}>
                                <Select onChange={setTimeRange}>
                                    <Select.Option value="1">午前</Select.Option>
                                    <Select.Option value="2">午後1</Select.Option>
                                    <Select.Option value="3">午後2</Select.Option>
                                    <Select.Option value="4">夜</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="eventOpenTime"
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
                                        // setEventBeginTime(timeString[0]);
                                        // setEventEndTime(timeString[1])
                                    }}
                                    minuteStep="15"
                                    secondStep="60"
                                    status
                                />
                            </Form.Item>
                        </Form>
                </div>
            </Modal>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "30px" }}>
                <div>
                    {date.date()}
                </div>
                {(buttonShow && allowInsertEventButton) &&
                    <Button id="insertEvent-Button" type="primary" size="small" shape="circle" style={{ display: buttonShow ? null : "none" }} onClick={openInsertEventModal}>
                        +
                    </Button>}
            </div>
            <div style={{ height: '80px', overflow: 'auto' }}>
                {events.map((event) => (
                    <div key={event.eventInfoId}>
                        <DraggableEvent key={event.eventInfoId} event={event} handlerButtonShow={handlerButtonShow} itemnames={itemnames} courtnames={courtnames} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const EventCalendar = () => {

    const dispatch = useDispatch();

    // 存储从api获取的原始数据
    const [events, setEvents] = useState([]);

    // 对查询到的数据进行加工
    const [eventList, setEventList] = useState([]);

    const [itemnames, setItemnames] = useState([]);

    const [courtnames, setCourtnames] = useState([]);

    const infoDivColor = useMemo(() => [
        {
            itemInfoId: 1,
            itemName: "バスケットボール",
            divColor: "#FFDAB9"
        },
        {
            itemInfoId: 2,
            itemName: "バレーボール",
            divColor: "#FFFF99"
        },
        {
            itemInfoId: 3,
            itemName: "卓球",
            divColor: "#ADD8E6"
        },
        {
            itemInfoId: 4,
            itemName: "バトミントン",
            divColor: "#98FB98"
        }
    ], [])

    const fetchData = useCallback(async () => {
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
    }, [])

    const [callGetEventInfosByUserIdApiFlg, setCllGetEventInfosByUserIdApiFlg] = useState(false);

    const getEventInfoList = useCallback(async () => {
        const response = await api.get('/eventInfo/getEventInfosByUserId');
        console.log(response.data.data);
        if (response.data.code === 200) {
            const eventList = response.data.data.map(item => (
                {
                    ...item,
                    itemDivColor: infoDivColor.find(a => a.itemInfoId === item.itemInfo.itemInfoId)?.divColor || 'defaultColor',
                }
            ));
            console.table(eventList);
            setEvents(eventList);
        }
    }, [infoDivColor])

    // useEffect(() => {
    //     if (events) {
    //         const eventList = events.map(item => (
    //             // {
    //             //     id: item.eventInfoId,
    //             //     title: item.organizer.organizerName,
    //             //     item: item.itemInfo.itemInfoName,
    //             //     itemDivColor: infoDivColor.find(a => a.itemInfoId === item.itemInfo.itemInfoId)?.divColor || 'defaultColor',
    //             //     eventOpenTime: item.eventOpenTime,
    //             //     date: item.eventOpenDay
    //             // }
    //             {
    //                 ...item,
    //                 itemDivColor: infoDivColor.find(a => a.itemInfoId === item.itemInfo.itemInfoId)?.divColor || 'defaultColor',
    //             }
    //         ));
    //         console.table(eventList);
    //         setEventList(eventList);
    //     }
    // }, [events, infoDivColor]);


    useEffect(() => {
        getEventInfoList();
    }, [getEventInfoList])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    useEffect(() => {
        if (callGetEventInfosByUserIdApiFlg) {
            getEventInfoList();
            dispatch({
                type: "CHANGEOPENSNACKBAR",
                payload: true
            });
            dispatch({
                type: "CHANGEALERTSETTINGS",
                payload: {
                    type: "error",
                    text: "削除しました!"
                }
            });
            setCllGetEventInfosByUserIdApiFlg(false);
        }

    }, [getEventInfoList, dispatch, callGetEventInfosByUserIdApiFlg,])

    const updateEventInfo = useCallback(async (eventInfo) => {
        const response = await api.put("/eventInfo/updateinfo", eventInfo);
        if (response.data.code === 200) {
            dispatch({
                type: "CHANGEOPENSNACKBAR",
                payload: true
            });

            dispatch({
                type: "CHANGEALERTSETTINGS",
                payload: {
                    type: "success",
                    text: "更新しました！"
                }
            });
            return true;
        }
        else {
            dispatch({
                type: "CHANGEOPENSNACKBAR",
                payload: true
            });

            dispatch({
                type: "CHANGEALERTSETTINGS",
                payload: {
                    type: "error",
                    text: response.data.msg
                }
            });
            return false;
        }
    }, [dispatch])

    // 在 EventCalendar 组件中，使用 useState 管理事件状态，并实现 onDropEvent 方法来更新事件的日期。
    const onDropEvent = async (droppedEvent, newDate) => {
        console.log(droppedEvent.id);
        console.log(newDate);
        let updateInfo = events.find(event => event.eventInfoId === droppedEvent.eventInfoId);
        updateInfo = { ...updateInfo, eventOpenDay: dayjs(newDate).format('YYYY-MM-DD') }
        console.log(updateInfo);
        if (await updateEventInfo(updateInfo)) {
            await getEventInfoList();
        }
        // setEvents((prevEvents) =>
        //     prevEvents.map((event) =>
        //         event.id === droppedEvent.id ? { ...event, date: dayjs(newDate).format('YYYY-MM-DD') } : event
        //     )
        // );
    };


    // 获取当前日期，并传递给 defaultValue 属性
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    const handlePanelChange = (value) => {
        setCurrentMonth(value);
        console.log('Current month:', value);
    };

    // fullCellRender 是 Ant Design Calendar 组件的自定义渲染方法。它接收当前日期作为参数，
    // 并返回自定义的单元格内容。在这里，我们使用 DroppableDateCell 组件来渲染日期单元格，并处理拖拽事件。
    const fullCellRender = (currentDate, info) => {
        // 这里的判断是日历组件中单元格类型的判断:日期、月份
        // 月视图下
        if (info.type === 'date') {
            const currentDateEvents = events.filter((event) => event.eventOpenDay === dayjs(currentDate).format('YYYY-MM-DD'));
            return <DroppableDateCell date={dayjs(currentDate)} events={currentDateEvents} onDropEvent={onDropEvent} allowInsertEventButton={currentDate.month() === currentMonth.month()} />;

        }
        // 年视图下
        else if (info.type === 'month') {
            const monthStart = dayjs(currentDate).startOf('month');
            const monthEnd = dayjs(currentDate).endOf('month');
            const currentMonthEvents = eventList.filter((event) =>
                dayjs(event.date).isBetween(monthStart, monthEnd, null, '[]')
            );
            return (
                <div style={{ padding: '5px', minHeight: '100px' }}>
                    {currentMonthEvents.length > 0 ? (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {currentMonthEvents.map((event) => (
                                <li key={event.id}>{event.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <div>No events</div>
                    )}
                </div>
            );
        }
        // 这里多半进不到
        else if (info.type === 'year') {
            return (
                <div style={{ padding: '5px', minHeight: '100px' }}>
                    <div>{dayjs(currentDate).format('MMMM')}</div> {/* 显示月份 */}
                </div>
            );
        }
        return info.originNode;
    };

    return (
        <EventCalendarContext.Provider value={{ setCllGetEventInfosByUserIdApiFlg, itemnames, courtnames,updateEventInfo,getEventInfoList }}>
            <div>
                <div style={{ display: 'flex', gap: '1rem', textAlign: 'center', marginBottom: '1rem' }}>
                    {infoDivColor.map(infodiv => (
                        <div key={infodiv.itemName} style={{ height: '2rem', width: '8rem', backgroundColor: infodiv.divColor }}>
                            <Text style={{ fontWeight: 'bold', lineHeight: '2rem' }}>{infodiv.itemName}</Text>
                        </div>
                    ))}
                </div>
                <Text level={5} style={{ color: 'gray' }}>イベントをダブルクリックすると、編集できます。</Text>
                <Calendar defaultValue={currentMonth} fullCellRender={fullCellRender} onPanelChange={handlePanelChange} />
            </div>
        </EventCalendarContext.Provider>);
};

const EventManagerment = () => (
    // 设置拖拽环境
    // 我们使用 DndProvider 包裹我们的应用，并指定 HTML5Backend 作为拖拽的后端处理器。
    // DndProvider 是 react-dnd 提供的上下文提供器。HTML5Backend 是一种使用 HTML5 原生拖拽 API 的后端实现。
    <DndProvider backend={HTML5Backend}>
        {/* <div>
            111
        </div> */}
        <EventCalendar />
    </DndProvider>
);

export default EventManagerment;
