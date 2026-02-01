import Link from "next/link";
import * as styles from "../../page.css";

export default function GameResultPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>게임 결과</h1>
      <p className={styles.description}>게임 결과 리포트입니다.</p>
      <nav className={styles.nav}>
        <Link href="/game" className={styles.link}>
          다시 플레이
        </Link>
        <Link href="/report" className={styles.linkOutline}>
          리포트
        </Link>
        <Link href="/" className={styles.linkOutline}>
          홈으로
        </Link>
      </nav>
    </div>
  );
}
