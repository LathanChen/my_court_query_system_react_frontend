import * as React from 'react';
import { Select, Box, FormControl, InputLabel, MenuItem, Button } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import StyleIcon from '@mui/icons-material/Style';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from 'react-router-dom';
import api from '../../api';


export default function AddInfoBar(props) {

    const navigate = useNavigate();

    const toAddInfoPage =() => navigate('/adminpage/addinfo')

    const deleteInfo = () => {
        const fetchData = async () => {
                const data = props.batchselection
                // console.log(params)
                try {
                    //   console.log(setTimetoString(courtOpenBeginTime))
                    const response = await api.delete('/courtOpenInfo/deleteinfo', {data})
                    // console.log(response.data)
                    if (response.data === true) {
                        // todo:出现“添加成功”提示框
                        console.log('成功了')
                        // setShowSuccessAlert(true)
                        props.InfoListSearchRefresh(true) 
                    }
                }
                catch (error) {
                    console.error(error)
                    // setErrorMsg(error)
                }

        }
        
        fetchData()
    }

    return (
        <Box sx={{
            height: '9vh',
            padding: '1vh',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid skyblue',
            marginTop: '3vh'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                height: '5vh'
            }}>
                <ViewListIcon style={{ fontSize: '5vh',color:'#2196f3' }} />
                <div style={{
                    textAlign: 'center',
                    lineHeight: '5vh'
                }}>
                    <span>数据列表</span>
                </div>

            </div>
           {props.batchselection.length == 0?( <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                height: '5vh'
            }}>
                <PostAddIcon style={{ fontSize: '5vh',color:'#2196f3' }} />
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    width:'10vw',
                    textAlign: 'center',
                    lineHeight: '5vh'
                }}>
                    <span>操作</span>
                    <Button variant="contained" onClick={toAddInfoPage}>添加</Button>
                </div>

            </div>
):(
    <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                height: '5vh'
            }}>
                <StyleIcon style={{ fontSize: '5vh',color:'#2196f3' }} />
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    width:'10vw',
                    textAlign: 'center',
                    lineHeight: '5vh'
                }}>
                    <span>批量操作</span>
                    <Button variant="outlined" color='error' onClick={deleteInfo}>删除</Button>
                </div>

            </div>

)}
        </Box>
    );
}