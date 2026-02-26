import Image from "next/image";
import Flex from "@/components/common/Flex/Flex";
import HomeHeroSection from "@/components/home/HomeHeroSection/HomeHeroSection";
import LogLineSection from "@/components/home/LogLineSection/LogLineSection";
import * as styles from "./page.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <Image
        src="/assets/images/planet.png"
        alt=""
        width={850.96}
        height={703.75}
        className={styles.planetImage}
        priority
      />
      <div className={styles.heroViewport}>
        <div className={styles.topSpacer} />
        <HomeHeroSection />
        <div className={styles.bottomSpacer} />
      </div>
      <Flex
        direction="column"
        paddingLeft={10}
        paddingRight={10}
        paddingTop={21}
        paddingBottom={15}
        className={styles.content}
      >
        <LogLineSection />
      </Flex>
    </div>
  );
}
