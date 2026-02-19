import Image from "next/image";
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import { getServerSideUserInfo } from "@/server/auth/get-server-side-user-info";
import * as styles from "./layout.css";

export default async function ReportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = await getServerSideUserInfo();
  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundWrapper}>
        <Image
          src="/assets/images/dashboard.png"
          alt=""
          fill
          priority
          className={styles.backgroundImage}
        />
      </div>
      <div className={styles.foreground}>
        <Header fixed={false} userInfo={userInfo} />
        <main className={styles.contentStyle}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
