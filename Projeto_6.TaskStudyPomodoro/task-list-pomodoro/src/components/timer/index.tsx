import { useEffect, useState } from "react";
import { timeToSeconds } from "../../common/utils/time";
import { ITask } from "../../types/ITask";
import Button from "../button";
import Clock from "./clock";
import Style from './timer.module.scss';

interface Props {
   selected: ITask | undefined
}

export default function Timer({ selected }: Props) {
   const [time, setTime] = useState<number>();
   useEffect(() => {
      if(selected?.time) {
         setTime(timeToSeconds(selected.time)) 
      }
   }, [selected]);
   return (
      <div className={Style.timer}>
         <p className={Style.title}>Choose a task and start the Pomo timer now.</p>
         <div className={Style.clockWrapper}> 
            <Clock time={time}/>
         </div>
         <Button>
            Start!
         </Button>
      </div>
   )
}