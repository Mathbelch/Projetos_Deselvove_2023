import React, {useState} from 'react';
import { ITask } from '../../types/ITask';
import Button from '../button';
import Style from './Form.module.scss';
import { v4 } from 'uuid';

interface Props {
   setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

function Form({ setTasks }: Props) {
   const [task, setTask] = useState("");
   const [time, setTime] = useState("00:00");
   function addTask(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setTasks(oldTasks => 
         [
            ...oldTasks, 
            {
               task,
               time,
               selected: false,
               completed: false,
               id: v4()
            }
         ]
      );
      setTask("");
      setTime("00:00");
   }

   return (
      <form className={Style.newTask} onSubmit={addTask}>
         <div className={Style.inputContainer}>
            <label className={Style.label} htmlFor='task'>
               Insert a new task
            </label>
            <input type='text' name='task' value={task} onChange={event => setTask( event.target.value)} id='task' placeholder='Task to be completed' required>

            </input>
         </div>
         <div className={Style.inputContainer}>
            <label className={Style.label} htmlFor='time'>
               Time
            </label>
            <input type='time' step='1' name='time' value={time} 
            onChange={event => setTime(event.target.value)} id='time' min='00:00:00' max='02:30:00' required>
            </input>
         </div>
         <Button type='submit'> 
            Add Task
         </Button>
      </form>
   )
}

export default Form;
