import styles from './Sorter.module.scss';
import options from './options.json';
import classNames from 'classnames';
import React, { useState } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

export type SorterOptions = '' | 'portion' | 'qty_pessoas' | 'price';

interface Props {
   sorter: SorterOptions,
   setSorter: React.Dispatch<React.SetStateAction<SorterOptions>>;
}

export default function Sorter({
   sorter,
   setSorter
}: Props) {
   const [opened, setOpened] = useState(false);
   const sorterName = sorter && options.find(option => option.value === sorter)?.name
   return (
      <button className={classNames({
         [styles.sorter]: true,
         [styles["sorter--active"]]: sorter !== "",})} 
         onClick={() => setOpened(!opened)} onBlur={() => setOpened(false)}>
         <span>{sorterName || "Sort by:"}</span>
         {opened ? < MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} />}
         <div className={classNames({
            [styles.sorter__options]: true,
            [styles["sorter__options--active"]]: opened,
         })}>
            {options.map((option) => (
               <div className={styles.sorter__option} key={option.value} onClick={() => setSorter(option.value as SorterOptions)}>
                  {option.name}
               </div>
            ))}
         </div>
      </button>
   )
}