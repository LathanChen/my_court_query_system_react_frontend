import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminSlider(props) {
  const theme = useTheme();

  const handleDrawerClose = () => {
    props.handleSliderClose()
  };

//   控制四个一级菜单标题下的二级菜单的打开与关闭
  const [openInfobox, setOpenInfobox] = React.useState(false);
  const [openEventbox, setOpenEventbox] = React.useState(false);
  const [openCourtbox, setOpenCourtInbox] = React.useState(false);
  const [openUserbox, setOpenUserbox] = React.useState(false);
  const navigate = useNavigate();

  const handleInfoClick = () => {
    setOpenInfobox(!openInfobox);
  };
  const handleEventClick = () => {
    setOpenEventbox(!openEventbox);
  };
  const handleCourtClick = () => {
    setOpenCourtInbox(!openCourtbox);
  };
  const handleUserClick = () => {
    setOpenUserbox(!openUserbox);
  };

  const toAdminPageInfoShow = () =>{
    navigate('/adminpage');
  }
  const toAddInfo = () =>{
    navigate('/adminpage/addinfo');
  }
  const toAddCourtInfo = () =>{
    navigate('/adminpage/addcourtinfo');
  }
  const toCourtInfoList = () =>{
    navigate('/adminpage/courtinfolist');
  }
  
  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={props.open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItemButton onClick={() => navigate("/adminpage/dashboard")}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="ダッシュボード" />
            {/* {openInfobox ? <ExpandLess /> : <ExpandMore />} */}
          </ListItemButton>
          <ListItemButton onClick={handleInfoClick}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="信息管理" />
            {openInfobox ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openInfobox} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={toAdminPageInfoShow}>
                <ListItemIcon>
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="信息列表" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={toAddInfo}>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <ListItemText primary="添加信息" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FormatLineSpacingIcon />
                </ListItemIcon>
                <ListItemText primary="信息类型" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleEventClick}>
            <ListItemIcon>
              <ScoreboardIcon />
            </ListItemIcon>
            <ListItemText primary="活动管理" />
            {openEventbox ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openEventbox} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="活动列表" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="添加活动" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleCourtClick}>
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary="场馆管理" />
            {openCourtbox ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCourtbox} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <HolidayVillageIcon />
                </ListItemIcon>
                <ListItemText primary="场馆列表" onClick={toCourtInfoList}/>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AddBusinessIcon />
                </ListItemIcon>
                <ListItemText primary="添加场馆" onClick={toAddCourtInfo}/>
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleUserClick}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="用户管理" />
            {openUserbox ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openUserbox} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
  );
}