import styles from './Menu.module.scss';
import {ReactComponent as Logo} from 'assets/logo.svg';
import Searcher from './Searcher';
import { useState } from 'react';
import Filters from './Filters';

export default function Menu() {
   const [search, setSearch] = useState('');
   return(
      <main>
         <nav className={styles.mainMenu}>
            <Logo />
         </nav>
         <header className={styles.header}>
            <div className={styles.header__text}>A casa do código e da massa</div>
         </header>
         <section className={styles.menu}>
            <h3 className={styles.menu__header}>Menu</h3>
            <Searcher search={search} setSearch={setSearch}/>
            <div className={styles.menu__filters}>
               <Filters />
            </div>
         </section>
      </main>
   )
}