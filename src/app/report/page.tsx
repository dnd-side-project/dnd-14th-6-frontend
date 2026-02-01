import Link from "next/link";

export default function ReportPage() {
  return (
    <div>
      <h1>유저 리포트</h1>
      <p>유저 리포트 페이지입니다.</p>
      <nav style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <Link href="/report/ranking">랭킹 보기</Link>
        <Link href="/game">게임 시작</Link>
        <Link href="/">홈으로</Link>
      </nav>
    </div>
  );
}
