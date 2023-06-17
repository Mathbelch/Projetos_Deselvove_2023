import React from 'react';
import Form from '../components/form';
import List from '../components/list';
import Style from './App.module.scss'

function App() {
  return (
    <div className={Style.AppStyle}>
      <Form />
      <List />
    </div>
  );
}

export default App;
