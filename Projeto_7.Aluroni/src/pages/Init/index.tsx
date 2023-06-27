import menu from 'data/menu.json';
import styles from './Init.module.scss';

export default function Init() {
  let sugestedMeals = [...menu];
  sugestedMeals = sugestedMeals.sort(() => 0.5 - Math.random()).splice(0,3);
  return (
    <section>
      <h3 className={styles.title}>Our suggestions:</h3>
      <div className={styles.suggestions}>{sugestedMeals.map(item => (
        <div key={item.id} className={styles.suggestion}>
          <div className={styles.suggestion__image}>
            <img src={item.photo} alt={item.title} />
          </div>
          <button className={styles.suggestion__button}>
            See More
          </button>
        </div>
      ))}
      </div>
    </section>
  );
}