import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1>로그인</h1>
      <p>로그인 페이지입니다.</p>
      <nav style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <Link href="/">홈으로</Link>
        <Link href="/game">게임 시작</Link>
      </nav>
    </div>
  );
}
