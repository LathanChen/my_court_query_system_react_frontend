import * as React from 'react';
import { Select, Box, FormControl, InputLabel, MenuItem, Button } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import StyleIcon from '@mui/icons-material/Style';
import ViewListIcon from '@mui/icons-material/ViewList';

export default function AddInfoBar(props) {


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
                    <Button variant="contained">添加</Button>
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
                    <Button variant="outlined" color='error'>删除</Button>
                </div>

            </div>

)}
        </Box>
    );
}