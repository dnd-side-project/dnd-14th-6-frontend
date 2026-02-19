import Image from "next/image";
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import { getServerSideUserInfo } from "@/server/auth/get-server-side-user-info";
import * as styles from "./layout.css";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = await getServerSideUserInfo();

  return (
    <div className={styles.wrapper}>
      <Image
        src="/assets/images/home-background.png"
        alt=""
        fill
        className={styles.backgroundImage}
        priority
      />
      <Header userInfo={userInfo} />
      <main className={styles.contentStyle}>{children}</main>
      <Footer />
    </div>
  );
}
