import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import ruAntd from 'antd/lib/locale/ru_RU';
import { App } from './App';
import { initDayJs } from './utils/initDayJS';
import './index.css';

initDayJs();

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider locale={ruAntd}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
