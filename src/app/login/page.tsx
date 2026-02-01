import Link from "next/link";
import * as styles from "../page.css";

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>로그인</h1>
      <p className={styles.description}>로그인 페이지입니다.</p>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          홈으로
        </Link>
        <Link href="/game" className={styles.link}>
          게임 시작
        </Link>
      </nav>
    </div>
  );
}
