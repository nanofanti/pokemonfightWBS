import { NavLink } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.left_nav}>
        <NavLink to="/pokedex">
          <img src="/pokedex_nav.png" className={styles.nav_button} />
        </NavLink>
        <NavLink to="/pokefight">
          <img src="/Pokefight_nav.png" className={styles.nav_button} />
        </NavLink>
      </div>
      <NavLink to="/">
        <img src="/logo.png" className={styles.nav_logo} />
      </NavLink>
      <div className={styles.right_nav}>
        <NavLink to="/leaderboard">
          <img src="/leaderboard_nav.png" className={styles.nav_button} />
        </NavLink>
        <NavLink to="/aboutUs">
          <img src="/about_us_nav.png" className={styles.nav_button} />
        </NavLink>
      </div>
    </div>
  );
}
