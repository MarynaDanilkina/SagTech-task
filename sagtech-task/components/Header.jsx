import Link from "next/link";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../config/firebase";
import styles from "./header.module.css";
import useColorTheme from "@/config/theme";

function Header() {
  const { colorTheme, toggleColorTheme } = useColorTheme();
  const onChangeTheme = () => {
    toggleColorTheme();
  };
  const router = useRouter();
  function logout() {
    signOut(auth).then(() => {
      router.push("/");
    });
  }
  return (
    <header className={styles.header__container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/calendar">
            <Image
              src="/logo.png"
              alt="Landscape picture"
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className={styles.links}>
          <button
            type="button"
            className={`${styles.button__theme} ${colorTheme}`}
            onClick={onChangeTheme}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="mdi-theme-light-dark"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z" />
            </svg>
          </button>

          <button
            type="button"
            className={styles.button__logout}
            onClick={logout}
          >
            Выйти
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
