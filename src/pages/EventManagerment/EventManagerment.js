import React, { useState, useCallback, useEffect } from 'react';
import { Calendar } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import api from '../../api';
import dayjs from 'dayjs';

const DraggableEvent = ({ event }) => {
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
    }));

    return (
        <div ref={drag} style={{ padding: '5px', backgroundColor: 'lightblue', cursor: 'move' }} onDoubleClick={() => alert(event.id)}>
            {event.title}
        </div>
    );
};

const DroppableDateCell = ({ date, events, onDropEvent }) => {
    console.log(date);

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
    
    const [{ isOver }, drop] = useDrop({
        accept: 'EVENT',
        drop: (item) => {
            console.log("Dropped event:", item.event);
            console.log("On date:", date.format('YYYY-MM-DD'));
            onDropEvent(item.event, date);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }, [date]);

    return (
        <div ref={drop} style={{ backgroundColor: isOver ? 'lightgreen' : 'white', minHeight: '100px' }}>
            <div>{date.date()}</div> {/* 显示日期 */}
            {events.map((event) => (
                <DraggableEvent key={event.id} event={event} />
            ))}
        </div>
    );
};

const EventCalendar = () => {

    // const [events, setEvents] = useState([]);

    const getEventInfoList = useCallback(async () => {
        const response = await api.get('/eventInfo/getEventInfosByUserId');
        console.log(response.data.data);
        const eventList = response.data.data.map(item => (
            {
                id: item.eventInfoId,
                title: `${item.organizer.organizerName}-${item.itemInfo.itemInfoName}`,
                date: item.eventOpenDay
            }
        ))
        console.log(eventList);

        setEvents(eventList);

    }, [])


    useEffect(() => {
        getEventInfoList();
    }, [getEventInfoList])

    const [events, setEvents] = useState([]);

    // 在 EventCalendar 组件中，使用 useState 管理事件状态，并实现 onDropEvent 方法来更新事件的日期。
    const onDropEvent = (droppedEvent, newDate) => {
        console.log(droppedEvent.id);
        console.log(newDate);
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === droppedEvent.id ? { ...event, date: dayjs(newDate).format('YYYY-MM-DD') } : event
            )
        );
    };

    // fullCellRender 是 Ant Design Calendar 组件的自定义渲染方法。它接收当前日期作为参数，
    // 并返回自定义的单元格内容。在这里，我们使用 DroppableDateCell 组件来渲染日期单元格，并处理拖拽事件。
    const fullCellRender = (currentDate, info) => {
        // 这里的判断是日历组件中单元格类型的判断:日期、月份
        // 月视图下
        console.log(currentDate);
        if (info.type === 'date') {
            const currentDateEvents = events.filter((event) => event.date === dayjs(currentDate).format('YYYY-MM-DD'));
            return <DroppableDateCell date={dayjs(currentDate)} events={currentDateEvents} onDropEvent={onDropEvent} />;
        }
        // 年视图下
        else if (info.type === 'month') {
            const monthStart = dayjs(currentDate).startOf('month');
            const monthEnd = dayjs(currentDate).endOf('month');
            const currentMonthEvents = events.filter((event) =>
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

    // 获取当前日期，并传递给 defaultValue 属性
    const currentMonth = dayjs();

    return <Calendar defaultValue={currentMonth} fullCellRender={fullCellRender} />;
};

const EventManagerment = () => (
    // 设置拖拽环境
    // 我们使用 DndProvider 包裹我们的应用，并指定 HTML5Backend 作为拖拽的后端处理器。
    // DndProvider 是 react-dnd 提供的上下文提供器。HTML5Backend 是一种使用 HTML5 原生拖拽 API 的后端实现。
    <DndProvider backend={HTML5Backend}>
        <EventCalendar />
    </DndProvider>
);

export default EventManagerment;
