import Flex from "@/components/common/Flex/Flex";
import HomeHeroSection from "@/components/home/HomeHeroSection/HomeHeroSection";
import LogLineSection from "@/components/home/LogLineSection/LogLineSection";

import * as styles from "./page.css";
import PlanetParallax from "./planet-parallax";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <PlanetParallax />
      <div className={styles.heroViewport}>
        <div className={styles.topSpacer} />
        <HomeHeroSection />
        <div className={styles.bottomSpacer} />
      </div>
      <Flex
        direction="column"
        paddingLeft={10}
        paddingRight={10}
        paddingTop={15}
        paddingBottom={15}
        className={styles.content}
      >
        <LogLineSection />
      </Flex>
    </div>
  );
}
