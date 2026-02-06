import Link from "next/link";
import Flex from "@/components/common/Flex/Flex";
import * as styles from "./page.css";

export default function ReportPage() {
  return (
    <Flex width={"100%"} direction="column">
      <nav className={styles.nav}>
        <Link href="/report/ranking" className={styles.link}>
          랭킹 보기
        </Link>
      </nav>
    </Flex>
  );
}
