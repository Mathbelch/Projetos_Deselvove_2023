import { ReactComponent as Logo } from 'assets/logo.svg';
import styles from './MenuLogo.module.scss';

export default function MenuLogo() {
  const routes = [{
    label: 'Init',
    to:'/'
  }, {
    label: 'Menu',
    to: '/menu'
  }, {
    label: 'About',
    to: '/about'
  }];
  return (
    <nav className={styles.mainMenu}>
      <Logo />
      <ul className={styles.mainMenu__list}>
        {routes.map((route, index) => (
          <li key={index} className={styles.mainMenu__link}> 
            <a href={route.to}>
              {route.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}