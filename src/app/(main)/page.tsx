import Link from "next/link";
import Flex from "@/components/common/Flex/Flex";
import * as styles from "./page.css";

export default function Home() {
  return (
    <Flex width={"100%"} direction="column">
      <nav className={styles.nav}>
        <Link href="/login" className={styles.link}>
          로그인
        </Link>
        <Link href="/game" className={styles.link}>
          게임 시작
        </Link>
      </nav>
    </Flex>
  );
}
