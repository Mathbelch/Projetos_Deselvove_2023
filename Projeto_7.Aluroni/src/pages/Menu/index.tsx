import styles from './Menu.module.scss';
import {ReactComponent as Logo} from 'assets/logo.svg';
import Searcher from './Searcher';
import { useState } from 'react';
import Filters from './Filters';
import Sorter, { SorterOptions } from './Sorter';
import Itens from './Itens';

export default function Menu() {
   const [search, setSearch] = useState('');
   const [filter, setFilter] = useState<number | null>(null);
   const [sorter, setSorter] = useState<SorterOptions>('');
   return(
      <main>
         <nav className={styles.mainMenu}>
            <Logo />
         </nav>
         <header className={styles.header}>
            <div className={styles.header__text}>The house of code and pasta</div>
         </header>
         <section className={styles.menu}>
            <h3 className={styles.menu__header}>Menu</h3>
            <Searcher search={search} setSearch={setSearch}/>
            <div className={styles.menu__filters}>
               <Filters filter={filter} setFilter={setFilter}/>
               <Sorter sorter={sorter} setSorter={setSorter}/>
            </div>
            <Itens search={search} filter={filter} sorter={sorter}/>
         </section>
      </main>
   )
}