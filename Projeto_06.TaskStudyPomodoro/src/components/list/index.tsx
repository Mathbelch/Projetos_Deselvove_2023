import { ITask } from '../../types/ITask';
import Style from './List.module.scss';
import Item from './item';

interface Props {
   tasks: ITask[],
   selectTask: (taskSelected: ITask) => void
}

function List({ tasks, selectTask }: Props) {
   return (
      <aside className={Style.taskList}>
         <h2>Task List</h2>
         <ul>
            {tasks.map((item) => (
              <Item
              selectTask={selectTask} 
              key={item.id}
               {...item}
              />
            ))}
         </ul>
      </aside>
   )
}

export default List;