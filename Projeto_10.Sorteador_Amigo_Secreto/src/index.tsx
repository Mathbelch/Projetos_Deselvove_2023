import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './routes';
import Cabecalho from './componentes/Cabecalho/Cabecalho';

ReactDOM.render(
  <React.StrictMode>
    <Cabecalho />
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
