import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Descriptions, Skeleton } from 'antd';
import axios from 'axios';
import './EvaluateZone.css'

const EvaluateZone = (props) => {

  const [courtEvaluate, setCourtEvaluate] = useState({
    score: 2.5,
    courtComment: ''
  })

  // const [courtInfos,setCourtInfos] = useState({})
  const [courtInfos, setCourtInfos] = useState({
    comments: [],
    courtItemNames: '',
    courtAvgScore: 0,
    courtInfo: {}
  })

  const [showMes, setShowMes] = useState('')
  const getAllCourtInfoById = async (courtId) => {
    const params = { courtId: courtId }
    try {
      const response = await axios.get('/courtinfo/getAllCourtInfoById', { params })
      console.log(response.data)
      setCourtInfos(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleChangeUserComment = (event) => {
    if (event.target.value.length < 301) {
      setShowMes('')
      setCourtEvaluate(prevState => ({
        ...prevState,
        courtComment: event.target.value
      }))
    }
    else {
      setShowMes('您最多可以输入300个字')
    }

  }

  const handlerChangeUserScore = (event) => {
    setCourtEvaluate(prevState => ({
      ...prevState,
      score: event.target.value
    }))
  }

  const sendScoreAndComment = async () => {
    const params = { ...courtEvaluate, courtId: props.courtId }
    try {
      const response = await axios.post('/courtinfo/setScroeAndComment', params)
      if (response.data === 1) {
        // todo => 画面出现成功的提示
        getAllCourtInfoById(props.courtId)
        setShowMes('评价发布成功！')
        setCourtEvaluate({
          score: 2.5,
          courtComment: ''
        })
      }
      else {
        // todo => 画面出现失败的提示
        setShowMes('评价发布失败！')
      }
    }
    catch (error) {
      console.log(error)
    }
    let timer
    await new Promise((resolve) => {
      timer = setTimeout(() =>{
        setShowMes('')
        resolve()
      }, 3000)
    })
    console.log(timer)
    clearTimeout(timer)

  }

  // 控制骨架屏的显示与关闭
  const [skeletonShow,setSkeletonShow] = useState(true)

  const handleChangeskeletonShowAfter1s = async ()=>{
    let timer
    await new Promise((resolve) => {
      timer = setTimeout(() => {
        setSkeletonShow(false)
        resolve()
    }, 1000);
    })
    console.log(timer)
    clearTimeout(timer)
}

  useEffect(() => {
    handleChangeskeletonShowAfter1s()
    console.log(props.courtId);
    getAllCourtInfoById(props.courtId);
  }, [props.courtId]);

  const commetDiv = courtInfos.comments.map((comment, index) => (
    <div
      style={{
        height: '15vw',
        width: 'calc(100% - 2rem)',
        margin: '10px auto 0',
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        wordWrap: 'break-word', // 允许长单词和数组换行
        overflow:'auto'
      }}
      key={index}>
      <Rating name="half-rating" value={comment.score} precision={0.5} size="small" readOnly />
      <Typography variant="subtitle2" gutterBottom>
        {comment.courtComment}
      </Typography>
    </div>
  ))

  return (
    skeletonShow?(<div style={{ marginTop: '60px',padding:'5px' }}>
      <div className='Descriptions'>
        <Skeleton
          active={true}
          size={'large'}
          block={true}
          paragraph={{ rows: 4 }}
           />
      </div>
      <div className='ratingAndInput'>
        <Skeleton
          active={true}
          size={'large'}
          block={true}
          paragraph={{ rows: 2 }}/>
      </div>
      <div className='textDiv-Skeleton'>
        <Skeleton
          active={true}
          size={'large'}
          block={true}
          paragraph={{ rows: 8 }}/>
      </div>
    </div>):(
    <div style={{ marginTop: '60px',padding:'5px' }}>
      <div>
        <Descriptions
          title={courtInfos.courtInfo.courtName ? courtInfos.courtInfo.courtName : ''}
          column={2}
          size='small'
          className='Descriptions'
          bordered={true}
        >
          <Descriptions.Item label="评分">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="half-rating"
                value={courtInfos.courtAvgScore}
                precision={0.5}
                readOnly
              />
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="电话">{courtInfos.courtInfo.courtTelNum}</Descriptions.Item>
          <Descriptions.Item label="地址">{courtInfos.courtInfo.courtAdress}</Descriptions.Item>
          <Descriptions.Item label="最寄り駅">{courtInfos.courtInfo.courtStation}</Descriptions.Item>
          <Descriptions.Item label="项目">{courtInfos.courtItemNames}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className='ratingAndInput'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <Rating
          name="half-rating"
          value={courtEvaluate.score}
          defaultValue={2.5}
          precision={0.5}
          onChange={handlerChangeUserScore}
        />
        {showMes && (
                    <Typography variant="subtitle2" color="primary" style={{marginRight:'5vw'}}>
                        {showMes}
                    </Typography>
                )}
        </div>

        <Paper
          component="form"
          sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <TextareaAutosize
            minRows={5}
            maxRows={5}
            placeholder="输入您的评价"
            style={{ flex: 1, resize: 'none', border: '1px solid skyblue' }}
            value={courtEvaluate.courtComment}
            onChange={handleChangeUserComment}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={sendScoreAndComment}>
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
      <div className='textDiv'>
        {commetDiv.length > 0 ? commetDiv : '暂无数据！'}
      </div>

    </div>)
  );
};

export default EvaluateZone;
