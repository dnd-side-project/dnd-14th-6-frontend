import Link from "next/link";

export default function RankingPage() {
  return (
    <div>
      <h1>랭킹</h1>
      <p>랭킹 페이지입니다.</p>
      <nav style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <Link href="/report">리포트로 돌아가기</Link>
        <Link href="/">홈으로</Link>
      </nav>
    </div>
  );
}
