import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { InputLabel, FormControl, Select, MenuItem, Typography, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1,width:'40vw',margin:'auto' }}>
        {/* 网格布局
        spacing：用于设置网格项之间的间距。可以使用该属性指定间距的大小，单位可以是像素或任何有效的 CSS 长度单位。
        xs、sm、md、lg、xl：这些属性用于指定在不同屏幕大小下网格项的宽度比例。每个属性可以接受一个介于 0 和 12 之间的整数值，表示网格项所占据的栅格数。
        例如，xs={12} 表示在最小屏幕宽度时，该网格项将占据整个容器的宽度；sm={6} 表示在小屏幕以上时，该网格项将占据容器宽度的一半。
        justify：用于设置网格项在水平方向上的对齐方式。
        可以使用以下值之一：flex-start（默认值，左对齐）、center（居中对齐）、flex-end（右对齐）、space-between（两端对齐，项目之间均匀分布）和 space-around（项目周围均匀分布）。
        alignItems：用于设置网格项在垂直方向上的对齐方式。可以使用以下值之一：flex-start（顶部对齐）、center（居中对齐）、flex-end（底部对齐）和 stretch（拉伸以填充容器的高度）。 */}
      <Grid container spacing={2} alignContent="center" justifyContent='center'>
        <Grid xs={2} md={2}>
            <Item>
                <Typography variant="subtitle2">开始时间：</Typography>
            </Item>         
        </Grid>
        <Grid xs={9} md={9}>
          <Item>
            <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <TimePicker
                                // value={selectedDate}
                                // onChange={handleDateChange}
                                label={<Typography sx={{fontSize:'12px'}}>开始时间：</Typography>}
                                slotProps={{ textField: { size: 'small' } }} />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl></Item>
        </Grid>
        <Grid xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid xs={6} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}