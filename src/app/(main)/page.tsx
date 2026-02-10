import Image from "next/image";
import Flex from "@/components/common/Flex/Flex";
import HomeHeroSection from "@/components/home/HomeHeroSection/HomeHeroSection";
import LogLineSection from "@/components/home/LogLineSection/LogLineSection";
import * as styles from "./page.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <Image
        src="/assets/images/home-planet.png"
        alt=""
        width={1024}
        height={844}
        className={styles.planetImage}
        priority
      />
      <Flex
        direction="column"
        paddingLeft={10}
        paddingRight={10}
        paddingTop="clamp(12rem, 20vh, 17rem)"
        paddingBottom={15}
        gap={25.5}
        className={styles.content}
      >
        <HomeHeroSection />
        <LogLineSection />
      </Flex>
    </div>
  );
}
