import styles from './Meal.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import menu from 'data/menu.json';
import TagsMeal from 'components/TagsMeal';

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
          <TagsMeal {...meal}/>
        </div>
      </section>
    </>
  );
}