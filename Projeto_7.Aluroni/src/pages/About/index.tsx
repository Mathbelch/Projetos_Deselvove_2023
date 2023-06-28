import styles from './About.module.scss';
import stylesTheme from 'styles/Theme.module.scss';
import house from 'assets/about/house.png';
import pasta1 from 'assets/about/pasta1.png';
import pasta2 from 'assets/about/pasta2.png';

const images = [pasta1, pasta2];

export default function About() {

  return (
    <section>
      <h3 className={stylesTheme.title}>About Us</h3>
      <div className={styles.aboutUs}>
        <img className={styles.aboutUs__image} src={house} alt="Aluroni's House" />
        <div className={styles.aboutUs__text}>
          <p>We at Aluroni offer you, our dear customers, the tastiest and most sophisticated Homemade Italian Pasta in São Paulo! We value the traditional ingredients of Italian cuisine, fresh and of excellent quality so that your experience is even more intense!</p>
          <p>We also have a meat menu with many options according to your taste!</p>
          <p>To accompany the Italian pasta, Aluroni has a reserve of special wines, which harmonize perfectly with your delivery, be it meat or pasta!</p>
        </div>
      </div>

      <div className={styles.images}>
        {images.map((image, index) => (
          <div key={index} className={styles.images__image}>
            <img src={image} alt="pasta example" />
          </div>
        ))}
      </div>
    </section>
  );
}