import Image from "next/image";
import Header from "@/components/common/Header/Header";
import { getServerSideUserInfo } from "@/server/auth/get-server-side-user-info";
import * as styles from "./layout.css";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = await getServerSideUserInfo();

  return (
    <div className={styles.wrapper}>
      <Image
        src="/assets/images/dashboard.png"
        alt=""
        fill
        className={styles.backgroundImage}
        priority
      />
      <Header userInfo={userInfo} />
      <main className={styles.contentStyle}>{children}</main>
    </div>
  );
}
