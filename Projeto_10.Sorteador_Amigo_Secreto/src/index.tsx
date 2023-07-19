import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Cabecalho from './componentes/Cabecalho/Cabecalho';
import Card from './componentes/Card/Card';

ReactDOM.render(
  <React.StrictMode>
    <Cabecalho />
    <Card />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
