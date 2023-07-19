import { timeToSeconds } from "./time";

export function timeFormat(time: string = '0', breakTime: string = '0', cycle: string = '1') {
   const total = timeToSeconds(time)*Number(cycle) + Number(breakTime)*(Number(cycle)-1)*60;
   let minutes = Math.floor(total/60);
   const hour =  ((minutes>=60)?  (Math.floor(minutes/60)) : 0);
   if (hour != 0){
      minutes = minutes - (hour*60);
   }
   const seconds = total % 60;
   const [hour10, hour1] = ['0', String(hour)]
   const [minute10, minute1] = String(minutes).padStart(2,'0');
   const [second10, second1] = String(seconds).padStart(2,'0'); 
   return `${hour10}${hour1}h ${minute10}${minute1}min`
}
