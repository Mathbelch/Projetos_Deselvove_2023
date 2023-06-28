import classNames from 'classnames';
import styles from './Meal.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import menu from 'data/menu.json';

export default function Meal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meal = menu.find(item => item.id === Number(id));
  if(!meal) {
    return '';
  }
  return (
    <>
      <button className={styles.return} onClick={() => navigate(-1)}>
        {'< Voltar'}
      </button>
      <section className={styles.container}>
        <h1 className={styles.title}>{meal.title}</h1>
        <div className={styles.image}>
          <img src={meal.photo} alt={meal.title}/>
        </div>
        <div className={styles.content}>
          <p className={styles.content__description}>{meal.description}</p>
          <div className={styles.tags}>
            <div className={classNames({
              [styles.tags__type]: true,
              [styles[`tags__type__${meal.category.label.toLowerCase()}`]]: true
            })}> 
              {meal.category.label}
            </div>
            <div className={styles.tags__portion}>
              {meal.size}g
            </div>
            <div className={styles.tags__qtypeople}>
              Serves {meal.serving} {meal.serving === 1 ? 'person' : 'people'}
            </div>
            <div className={styles.tags__value}>
              $ {meal.price.toFixed(2)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}