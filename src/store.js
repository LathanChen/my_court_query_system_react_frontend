import { createStore } from 'redux'

const initialState = { courtInfoList:[],teamPlanningInfo:[]};

// 创建store
function reducer(state = initialState, action) {
  switch(action.type) {
    // 每一个action.type对应一个动作，修改store中state的状态
    case 'FINDCOURTINFOLIST':
      return { ...state, courtInfoList: action.payload};
    case 'FINDTEAMPLANNINGINFOF':
      return { ...state, teamPlanningInfo: action.payload};
    default:
      return state;
  }
}
const store = createStore(reducer);

export default store;