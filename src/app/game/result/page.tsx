import Link from "next/link";

export default function GameResultPage() {
  return (
    <div>
      <h1>게임 결과</h1>
      <p>게임 결과 리포트입니다.</p>
      <nav style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <Link href="/game">다시 플레이</Link>
        <Link href="/report">리포트</Link>
        <Link href="/">홈으로</Link>
      </nav>
    </div>
  );
}
