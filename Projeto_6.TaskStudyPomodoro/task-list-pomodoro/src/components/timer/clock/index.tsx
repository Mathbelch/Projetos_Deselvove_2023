import Style from './clock.module.scss';

interface Props {
   time: number | undefined;
}

export default function Clock({ time = 0 }: Props) {
   const minutes = Math.floor(time/60);
   const seconds = time % 60;
   const [minute10, minute1] = String(minutes).padStart(2,'0');
   const [second10, second1] = String(seconds).padStart(2,'0');
   return (
      <>
         <span className={Style.clockNumber}>{minute10}</span>
         <span className={Style.clockNumber}>{minute1}</span>
         <span className={Style.clockDiv}>:</span>
         <span className={Style.clockNumber}>{second10}</span>
         <span className={Style.clockNumber}>{second1}</span>
      </>
   )
}