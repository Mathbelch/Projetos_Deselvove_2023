import styles from './Item.module.scss';
import TagsMeal from 'components/TagsMeal';
import { useNavigate } from 'react-router-dom';
import { Meal } from 'types/Meal';

export default function Item(props: Meal) {
  const { id, title, description, photo } = props;
  const navigate = useNavigate();
  return (
    <div className={styles.item} onClick={() => navigate(`/meal/${id}`)}>
      <div className={styles.item__image}>
        <img src={photo} alt={title} />
      </div>
      <div className={styles.item__description}>
        <div className={styles.item__title}>
          <h2>{title}</h2>
          <p> {description}</p>
        </div>
        <TagsMeal {...props}/>
      </div>
    </div>
  );
}