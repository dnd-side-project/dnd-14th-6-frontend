import Image from "next/image";
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import * as styles from "./layout.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/assets/images/home-background.png"
        alt=""
        fill
        className={styles.backgroundImage}
        priority
      />
      <Header />
      <main className={styles.contentStyle}>{children}</main>
      <Footer />
    </div>
  );
}
