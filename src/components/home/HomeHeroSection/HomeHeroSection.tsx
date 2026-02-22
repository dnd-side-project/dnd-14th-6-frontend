import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import CommandInput from "@/components/home/CommandInput/CommandInput";
import * as styles from "./HomeHeroSection.css";

const HERO_COPY = `A real-world CLI training game.
Practice like you would on the job, build your skills step by step.
And get personalized insights on your progress.
Learn faster. Improve smarter.`;

const HomeHeroSection = () => {
  return (
    <Flex direction="column" gap={7} align="flexStart">
      <Flex direction="column" gap={3.6} align="flexStart" width="100%">
        <h1 className={styles.heroTitle}>{"Where orbit\nmeets velocity"}</h1>
        <Text
          variant="subtitle5"
          color="coolgrey_100"
          className={styles.copyText}
        >
          {HERO_COPY}
        </Text>
      </Flex>
      <CommandInput />
    </Flex>
  );
};

export default HomeHeroSection;
