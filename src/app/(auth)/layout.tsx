import Image from "next/image";
import Header from "@/components/common/Header/Header";
import * as styles from "./layout.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/assets/images/dashboard.png"
        alt=""
        fill
        className={styles.backgroundImage}
        priority
      />
      <Header />
      <main className={styles.contentStyle}>{children}</main>
    </div>
  );
}
