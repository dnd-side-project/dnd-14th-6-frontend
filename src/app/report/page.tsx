import Link from "next/link";
import * as styles from "../page.css";

export default function ReportPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>유저 리포트</h1>
      <p className={styles.description}>유저 리포트 페이지입니다.</p>
      <nav className={styles.nav}>
        <Link href="/report/ranking" className={styles.link}>
          랭킹 보기
        </Link>
        <Link href="/game" className={styles.linkOutline}>
          게임 시작
        </Link>
        <Link href="/" className={styles.linkOutline}>
          홈으로
        </Link>
      </nav>
    </div>
  );
}
