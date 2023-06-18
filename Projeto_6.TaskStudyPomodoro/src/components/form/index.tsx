import React from 'react';
import { ITask } from '../../types/ITask';
import Button from '../button';
import Style from './Form.module.scss';
import { v4 } from 'uuid';

class Form extends React.Component<{
   setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}> {
   state = {
      task: '',
      time: '00:00'
   }

   addTask(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      this.props.setTasks(oldTasks => 
         [
            ...oldTasks, 
            {
               ...this.state,
               selected: false,
               completed: false,
               id: v4()
            }
         ]);
      this.setState({
         task: "",
         time: "00:00"
      });
   }

   render() {
      return (
         <form className={Style.newTask} onSubmit={this.addTask.bind(this)}>
            <div className={Style.inputContainer}>
               <label className={Style.label} htmlFor='task'>
                  Insert a new task
               </label>
               <input type='text' name='task' value={this.state.task} onChange={event => this.setState({...this.state, task: event.target.value})} id='task' placeholder='Task to be completed' required>

               </input>
            </div>
            <div className={Style.inputContainer}>
               <label className={Style.label} htmlFor='time'>
                  Time
               </label>
               <input type='time' step='1' name='time' value={this.state.time} 
               onChange={event => this.setState({...this.state, time: event.target.value})} id='time' min='00:00:00' max='02:30:00' required>

               </input>
            </div>
            <Button type='submit'> 
               Add Task
            </Button>
         </form>
      )
   }
}

export default Form;
