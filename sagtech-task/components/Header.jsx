import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.header__container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Landscape picture"
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className={styles.links}>
          <Link href="/signIn">Войти</Link>
          <Link href="/register">Регистрация</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
