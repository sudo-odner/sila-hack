// стилизация
import './styles/styles.scss';
// импортирование приложения
import App from './App';
// базовые модули
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// приложение 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter><App /></BrowserRouter>
);

