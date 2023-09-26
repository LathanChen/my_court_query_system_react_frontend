import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
// *****************项目部署时用HashRouter*****************
import {HashRouter} from 'react-router-dom'
// *****************项目部署时用HashRouter*****************
import { Provider } from 'react-redux';
import store from './store';
// *****************项目部署时设置全局默认配置*****************
import axios from 'axios'; // 导入 Axios，AWS部署配置

// const AWSADRESS = 'http://18.183.169.200:8081'//AWS的地址

// *****************项目部署时设置全局默认配置*****************

// *****************项目部署时设置全局默认配置*****************
// axios.defaults.baseURL = AWSADRESS; // 替换为你的后端 API 地址，AWS部署配置↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// axios.defaults.baseURL = 'http://54.238.131.149:8081'; // 替换为你的后端 API 地址，AWS部署配置,写成这样可以成功，常量的写法没有认证
// axios.defaults.timeout = 5000; // 设置请求超时时间，AWS部署配置
// *****************项目部署时设置全局默认配置*****************


// *****************无效的配置*****************
// const token = localStorage.getItem('token');
// console.log(token)
// // 踩过最大的坑，就是设置这个token，应该写成下面这种形式(现在好像不用配了，java里已经设置好了)
// if (token){
//   axios.defaults.headers.common['token'] = token;
// }
// *****************无效的配置*****************

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
    {/* <BrowserRouter> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </BrowserRouter> */}
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
