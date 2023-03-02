import Link from "next/link";
import Image from "next/image";
import { useSelector } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./header.module.css";
import { useRouter } from "next/router";

function Header() {
  const { user } = useSelector((state) => state.user);
  console.log('user', user)
  const router = useRouter();
  function logout() {
    signOut(auth).then(() => {
      router.push("/")
    })
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
            <button className={styles.button__logout} onClick={logout}>Выйти</button>
          </div> 
      </nav>
    </header>
  );
}

export default Header;
