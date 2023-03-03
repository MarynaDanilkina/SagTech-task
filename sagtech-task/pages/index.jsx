import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { reduserSlice } from "@/toolkitRedux/toolkitReducer";
import store from "@/toolkitRedux";
import { auth } from "../firebase";
import styles from "../styles/home.module.css";

function Home() {
  const { dispatch } = store;
  const { setUser } = reduserSlice.actions;
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        router.push("/calendar");
      } else {
        console.log("никто не вошел");
      }
    });
  }, []);
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
