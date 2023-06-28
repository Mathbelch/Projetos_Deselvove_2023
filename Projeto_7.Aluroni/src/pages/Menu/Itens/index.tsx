import menu from 'data/menu.json';
import Item from './Item';
import styles from './Itens.module.scss';
import { useEffect, useState } from 'react';
import { Menu } from 'types/Meal';

interface Props {
   search: string,
   filter: number | null;
   sorter: string;
}

export default function Itens(props: Props) {
  const [list, setList] = useState(menu);
  const { search, filter, sorter } = props;

  function testSearch(title: string) {
    const regex = new RegExp(search, 'i');
    return regex.test(title);
  }

  function testFilter(id: number) {
    if(filter !== null) return filter === id;
    return true;
  }

  const sortPropertyAsc = (
    list: Menu,
    property: 'size' | 'serving' | 'price' 
  ) => {return list.sort((a, b) => (a[property] > b[property] ? 1 : -1));};

  function sort(newList: Menu) {
    switch(sorter) {
    case 'portion':
      return sortPropertyAsc(newList, 'size');
    case 'qty_people':
      return sortPropertyAsc(newList, 'serving');
    case 'price':
      return sortPropertyAsc(newList, 'price');
    default:
      return newList;
    }
  }

  useEffect(() => {
    const newList = menu.filter(item => testSearch(item.title) && testFilter(item.category.id));
    setList(sort(newList));
  }, [search, filter, sorter]);

  return (
    <div className={styles.itens}>
      {list.map(item => (
        <div>
          <Item key={item.id} {...item}/>
        </div>
      ))}
    </div>
  );
}