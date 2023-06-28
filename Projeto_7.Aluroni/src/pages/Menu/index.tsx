import styles from './Menu.module.scss';
import Searcher from './Searcher';
import { useState } from 'react';
import Filters from './Filters';
import Sorter, { SorterOptions } from './Sorter';
import Itens from './Itens';
import stylesTheme from 'styles/Theme.module.scss';

export default function Menu() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<number | null>(null);
  const [sorter, setSorter] = useState<SorterOptions>('');
  return(
    <section className={styles.menu}>
      <h3 className={stylesTheme.title}>Menu</h3>
      <Searcher search={search} setSearch={setSearch}/>
      <div className={styles.menu__filters}>
        <Filters filter={filter} setFilter={setFilter}/>
        <Sorter sorter={sorter} setSorter={setSorter}/>
      </div>
      <Itens search={search} filter={filter} sorter={sorter}/>
    </section>
  );
}