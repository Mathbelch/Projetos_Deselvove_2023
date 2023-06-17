import React from 'react';
import Button from '../button';
import Style from './Form.module.scss';

class Form extends React.Component {
   render() {
      return (
         <form className={Style.newTask}>
            <div className={Style.inputContainer}>
               <label className={Style.label} htmlFor='task'>
                  Insert a new task
               </label>
               <input type='text' name='task' id='task' placeholder='Task to be completed' required>

               </input>
            </div>
            <div className={Style.inputContainer}>
               <label className={Style.label} htmlFor='time'>
                  Time
               </label>
               <input type='time' step='1' name='time' id='time' min='00:00:00' max='02:30:00' required>

               </input>
            </div>
            <Button> 
               Add Task
            </Button>
         </form>
      )
   }
}

export default Form;
