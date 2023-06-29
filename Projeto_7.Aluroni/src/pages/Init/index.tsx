import menu from 'data/menu.json';
import styles from './Init.module.scss';
import stylesTheme from 'styles/Theme.module.scss';
import home from 'assets/home.png';
import { useNavigate } from 'react-router-dom';
import { Meal } from 'types/Meal';

export default function Init() {
  let sugestedMeals = [...menu];
  sugestedMeals = sugestedMeals.sort(() => 0.5 - Math.random()).splice(0,4);

  const navigate = useNavigate();

  function redirectToMeals(meal: Meal) {
    navigate(`/meal/${meal.id}`, {state: { meal }});
  }

  return (
    <section>
      <h3 className={stylesTheme.title}>Our suggestions:</h3>
      <div className={styles.suggestions}>{sugestedMeals.map(item => (
        <div key={item.id} className={styles.suggestion}>
          <div className={styles.suggestion__image}>
            <img src={item.photo} alt={item.title} />
          </div>
          <button className={styles.suggestion__button} onClick={() => redirectToMeals(item)}>
            See More
          </button>
        </div>
      ))}
      </div>
      <h3 className={stylesTheme.title}>Our Home</h3>
      <div className={styles.ourHome}>
        <img src={home} alt="Aluroni's house" />
        <div className={styles.ourHome__address}>
          Adress, 1100 <br /> <br /> Ville - SP
        </div>
      </div>
    </section>
  );
}