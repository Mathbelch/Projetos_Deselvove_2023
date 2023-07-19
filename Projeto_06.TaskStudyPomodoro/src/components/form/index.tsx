import React, {useState} from 'react';
import { ITask } from '../../types/ITask';
import Button from '../button';
import Style from './Form.module.scss';
import { v4 } from 'uuid';
import { timeFormat } from '../../common/utils/timeFormat';

interface Props {
   setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

function Form({ setTasks }: Props) {
   const [task, setTask] = useState("");
   const [time, setTime] = useState("00:00");
   const [breakTime, setBreakTime] = useState('0');
   const [cycles, setCycles] = useState("1");
   function addTask(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setTasks(oldTasks => 
         [
            ...oldTasks, 
            {
               task,
               time,
               breakTime,
               cycles,
               selected: false,
               completed: false,
               id: v4()
            }
         ]
      );
      setTask("");
      setTime("00:00");
      setBreakTime("0");
      setCycles("1");
   }

   return (
      <form className={Style.newTask} onSubmit={addTask}>
         <div className={Style.inputContainer}>
            <label className={Style.label} htmlFor='task'>
               Insert a new task
            </label>
            <input type='text' name='task' value={task} onChange={event => setTask(event.target.value)} id='task' placeholder='Task to be completed' required>

            </input>
         </div>
         <div className={Style.inputContainer2}>
            <div className={Style.inputContainer}>
               <label className={Style.label} htmlFor='cycles'>
                  Cycles
               </label>
               <input type='number' name='cycles' value={cycles} 
               onChange={event => setCycles(event.target.value)} id='cycles' min='1' max='5' required>
               </input>
            </div>
            <div className={Style.inputContainer}>
               <label className={Style.label} htmlFor='time'>
                  Time
               </label>
               <input type='time' name='time' value={time} 
               onChange={event => setTime(event.target.value)} id='time' min='00:01' max='03:00' required>
               </input>
            </div>
            <div className={Style.inputContainer}>
               <label className={Style.label} htmlFor='breakTime'>
                  Break
               </label>
               <input type='number' placeholder='min' name='breakTime' value={breakTime} 
               onChange={event => setBreakTime(event.target.value)} id='breakTime' min='0' max='30' required>
               </input>
            </div>
         </div>
         <Button type='submit'> 
            Add Task
         </Button>
         
         <span className={Style.total}>Total Time: {timeFormat(time, breakTime, cycles)}</span>
      </form>
   )
}

export default Form;
