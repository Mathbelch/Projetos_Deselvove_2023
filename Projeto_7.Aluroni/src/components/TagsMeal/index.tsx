import classNames from 'classnames';
import { Meal } from 'types/Meal';
import styles from './TagsMeal.module.scss';

export default function TagsMeal({
  category, 
  size,
  serving,
  price
}: Meal) {
  return (
    <div className={styles.tags}>
      <div className={classNames(
        styles.tags__type,
        styles[`tags__type__${category.label.toLowerCase()}`]
      )}>
        {category.label}
      </div>
      <div className={styles.tags__portion}>
        {size}g
      </div>
      <div className={styles.tags__qtypeople}>
        Serves {serving} {serving === 1 ? 'person' : 'people'}
      </div>
      <div className={styles.tags__value}>
        ${price.toFixed(2)}
      </div>
    </div>
  );
}