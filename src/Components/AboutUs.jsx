import styles from "../Styles/AboutUs.module.css";

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.team}>
        <h1 className={styles.HeadingOne}>Meet the Team</h1>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <img src="Andrea.JPG" alt="Image 1" className={styles.image} />
          <img className={styles.name} src="/AndreaHeading.png"></img>
        </div>
        <div className={styles.card}>
          <img src="Moritz.jpg" alt="Image 3" className={styles.image} />
          <img className={styles.name} src="/MoritzHeading.png"></img>
        </div>
        <div className={styles.card}>
          <img src="Marco.jpg" alt="Image 5" className={styles.image} />
          <img className={styles.name} src="/MarcoHeading.png"></img>
        </div>
      </div>
    </div>
  );
}
