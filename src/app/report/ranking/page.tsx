import Link from "next/link";
import * as styles from "../../page.css";

export default function RankingPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>랭킹</h1>
      <p className={styles.description}>랭킹 페이지입니다.</p>
      <nav className={styles.nav}>
        <Link href="/report" className={styles.link}>
          리포트로 돌아가기
        </Link>
        <Link href="/" className={styles.linkOutline}>
          홈으로
        </Link>
      </nav>
    </div>
  );
}
