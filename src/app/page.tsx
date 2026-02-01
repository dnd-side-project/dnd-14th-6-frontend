import Link from "next/link";
import * as styles from "./page.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>홈</h1>
      <p className={styles.description}>메인 페이지</p>
      <nav className={styles.nav}>
        <Link href="/login" className={styles.link}>
          로그인
        </Link>
        <Link href="/game" className={styles.link}>
          게임 시작
        </Link>
        <Link href="/report" className={styles.link}>
          리포트
        </Link>
      </nav>
    </div>
  );
}
