import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/home.module.css";

function Home() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    router.push("/calendar");
  }
  return (
    <div className={styles.homepage__container}>
      <Image
        priority="true"
        className={styles.logo}
        src="/logo.png"
        alt="Landscape picture"
        width={110}
        height={110}
      />
      <h1 className={styles.title}>Calendar</h1>
      <div className={styles.button__container}>
        <button
          type="button"
          className={styles.button}
          onClick={() => router.push("/signIn")}
        >
          Войти
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => router.push("/register")}
        >
          Регистрация
        </button>
      </div>
    </div>
  );
}

export default Home;
