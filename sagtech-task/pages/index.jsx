import Image from "next/image";
import Link from "next/link";
import styles from "../styles/home.module.css";

function Home() {
  return (
    <div className={styles.homepage__container}>
      <Image
        priority="true"
        className={styles.logo}
        src="/logo.png"
        alt="Landscape picture"
        width={160}
        height={160}
      />
      <h1 className={styles.title}>Calendar</h1>
      <div className={styles.button__container}>
        <button type="button" className={styles.button}>
          <Link href="/signIn">Войти</Link>
        </button>
        <button type="button" className={styles.button}>
          <Link href="/register">Регистрация</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
