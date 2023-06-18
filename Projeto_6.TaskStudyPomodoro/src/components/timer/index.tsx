import { useEffect, useState } from "react";
import { timeToSeconds } from "../../common/utils/time";
import { ITask } from "../../types/ITask";
import Button from "../button";
import Clock from "./clock";
import Style from './timer.module.scss';

interface Props {
   selected: ITask | undefined
   endTask: () => void
}

export default function Timer({ selected, endTask }: Props) {
   const [time, setTime] = useState<number>();
   useEffect(() => {
      if(selected?.time) {
         setTime(timeToSeconds(selected.time)) 
      }
   }, [selected]);

   function regressiveCount(counter: number = 0) {
      setTimeout(() => {
         if(counter > 0) {
            setTime(counter - 1);
            return regressiveCount(counter - 1);
         } 
         endTask();
      }, 1000);
   }

   return (
      <div className={Style.timer}>
         <p className={Style.title}>Choose a task and start the Pomo timer now.</p>
         <div className={Style.clockWrapper}> 
            <Clock time={time}/>
         </div>
         <Button onClick={() => regressiveCount(time)}>
            Start!
         </Button>
      </div>
   )
}