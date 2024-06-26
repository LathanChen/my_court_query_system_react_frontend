import { configureStore } from '@reduxjs/toolkit';

const initialState = { 
  courtInfoList:[],
  teamPlanningInfo:[],
  isLogin:false,
  todayEvents:{},
  adminPageLoading:true,
  alertSettings:{
    type:"info",
    text:""
  },
  openSnackbar:false
};

// 创建store
function reducer(state = initialState, action) {
  switch(action.type) {
    // 每一个action.type对应一个动作，修改store中state的状态
    case 'FINDCOURTINFOLIST':
      return { ...state, courtInfoList: action.payload};
    case 'FINDTEAMPLANNINGINFO':
      return { ...state, teamPlanningInfo: action.payload};
    case 'LOGIN':
      return { ...state, isLogin: action.payload};
    case 'LOGOUT':
      return { ...state, isLogin: action.payload};
    case 'SETTODAYEVENTS':
      return { ...state, todayEvents: action.payload};
    case 'ADMINPAGESTOPLOADING':
      return { ...state, adminPageLoading: action.payload};
    case 'CHANGEALERTSETTINGS':
      return { ...state, alertSettings: action.payload};
    case 'CHANGEOPENSNACKBAR':
      return { ...state, openSnackbar: action.payload};
    default:
      return state;
  }
}
const store = configureStore({
  reducer: reducer,
  // 可选的其他配置选项
});

export default store;