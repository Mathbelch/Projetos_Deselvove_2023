import { ITask } from '../../../types/ITask';
import Style from './Item.module.scss';
import { timeFormat } from '../../../common/utils/timeFormat';

interface Props extends ITask {
   selectTask: (taskSelected: ITask) => void
}

export default function Item({
   task, 
   time, 
   breakTime,
   cycles,
   selected, 
   completed, 
   id, 
   selectTask
}: Props) 
{
   return (
      <li className={`${Style.item} ${selected ? Style.itemSelected : ''} ${completed ? Style.itemCompleted : ''} `} onClick={() => !completed && selectTask({
         task,
         time,
         breakTime,
         cycles,
         selected,
         completed,
         id
      })}>
         <h3>{task}</h3>
         <span>({cycles}X) - {timeFormat(time)}</span>
         <span> / Break - {breakTime}min</span>
         {completed && <span className={Style.done} aria-label='task completed'></span>}
      </li>
   )
}