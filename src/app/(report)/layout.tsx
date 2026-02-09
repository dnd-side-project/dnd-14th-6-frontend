import Image from "next/image";
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import * as styles from "./layout.css";

export default function ReportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Header fixed={false} />
        <main className={styles.contentStyle}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
