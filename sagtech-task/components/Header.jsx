import Link from "next/link";
import Image from "next/image";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import styles from "./header.module.css";

function Header() {
  const { user } = useSelector((state) => state.user);
  console.log("user", user);
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
