import React, { useState, useEffect } from 'react';
import { Select, Button, Typography } from 'antd';
import './CountdownTimer.css';

const { Text } = Typography;

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(0); // 初始化为秒数
  const [timeLeft, setTimeLeft] = useState(0); // 初始化为秒数
  const [pauseFlg, setPauseFlg] = useState(true);

  const hangdleMinutesChange = (value) => {
    setMinutes(value / 60);
    setTimeLeft(value * 1000);
    setPauseFlg(true);
  }

  const calculateTimeLeft = () => {
    const minute = Math.floor(timeLeft / (60 * 1000));
    const second = Math.floor((timeLeft % (60 * 1000)) / 1000);
    return {
      minute,
      second
    };
  };

  const restart = () => {
    setTimeLeft(minutes * 60 * 1000);
    setPauseFlg(true);
  }

  useEffect(() => {
    if (!pauseFlg && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1000); // 正确地减少 timeLeft
      }, 1000);

      return () => clearInterval(timer); // 清除定时器
    }
  }, [pauseFlg, timeLeft]);

  const time = calculateTimeLeft();

  if (timeLeft < 0) {
    return <div className="countdown-expired">EXPIRED</div>;
  }

  return (
    <div>
      {time.minute === 0 && time.second === 0 ?
        (<div >
          <Text type="danger" style={{ fontSize: '5rem' }}>終了</Text>
        </div>) :
        (<div className='countDown-timer-display'>
          <div >
            <Text type={time.minute > 1 ? "success" : (time.minute === 1 ? "warning" : "danger")} style={{ fontSize: '5rem' }}>{`0${time.minute}`}</Text>
            <Text style={{ fontSize: '5rem', visibility: time.second % 2 === 1 ? "hidden" : "visible" }}>:</Text>
          </div>
          <div>
            <Text type={time.minute > 1 ? "success" : (time.minute === 1 ? "warning" : "danger")} style={{ fontSize: '5rem' }}>{time.second < 10 ? `0${time.second}` : time.second}</Text>
          </div>
        </div>)}
      <div className='countDown-timer-operation'>
        <div className='countDown-timer-select'>
          选择时间
          <Select
            style={{ width: 100 }}
            options={[
              { value: 300, label: '5分钟' },
              { value: 360, label: '6分钟' },
              { value: 420, label: '7分钟' },
              { value: 480, label: '8分钟' },
              { value: 540, label: '9分钟' },
              { value: 600, label: '10分钟' },
            ]}
            onChange={hangdleMinutesChange}
          />
        </div>
        <div className='countDown-timer-buttons'>
          {timeLeft === minutes * 60 * 1000 && pauseFlg ?
            <Button onClick={() => setPauseFlg(false)} disabled={!minutes}>
              开始
            </Button>
            : <Button onClick={restart}>
              重开
            </Button>}
          <Button onClick={() => setPauseFlg(!pauseFlg)} disabled={timeLeft === minutes * 60 * 1000}>
            {timeLeft < minutes * 60 * 1000 ? (pauseFlg ? '继续' : '暂停') : "暂停"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
