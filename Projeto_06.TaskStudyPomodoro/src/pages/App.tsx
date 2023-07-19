import React, { useState } from 'react';
import Form from '../components/form';
import List from '../components/list';
import Style from './App.module.scss'
import Timer from '../components/timer';
import { ITask } from '../types/ITask';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selected, setSelected] = useState<ITask>();

  function selectTask(taskSelected: ITask) {
    setSelected(taskSelected);
    setTasks(oldTasks => oldTasks.map(task => ({
      ...task,
      selected: task.id === taskSelected.id ? true : false
    })));
  }

  function endTask() {
    if(selected) {
      setSelected(undefined);
      setTasks(oldTasks => oldTasks.map(task => {
        if(task.id === selected.id) {
          return {
            ...task,
            selected: false,
            completed: true
          }
        }
        return task;
      }))
    }
  }

  function abortTask() {
    
  }

  return (
    <div className={Style.AppStyle}>
      <Form setTasks={setTasks}/>
      <List 
        tasks={tasks}
        selectTask={selectTask}  
      />
      <Timer selected={selected} endTask={endTask} />
    </div>
  );
}

export default App;
