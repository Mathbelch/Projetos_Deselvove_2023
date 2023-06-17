import React from 'react';
import Style from './List.module.scss';

function List() {
   const tasks = [
      {
         task: 'React',
         time: '02:00:00'
      }, {
         task: 'JavaScript',
         time: '01:30:00'
      }, {
         task: 'TypeScript',
         time: '03:00:00'
      }
   ];
   return (
      <aside className={Style.taskList}>
         <h2>Task List</h2>
         <ul>
            {tasks.map((item, index) => (
               <li key={index} className={Style.item}>
                  <h3>{item.task}</h3>
                  <span>{item.time}</span>
               </li>
            ))}
         </ul>
      </aside>
   )
}

export default List;