import IcHomeLogo from "@/assets/icons/colored/IcHomeLogo";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import CommandInput from "@/components/home/CommandInput/CommandInput";
import * as styles from "./HomeHeroSection.css";

const HERO_COPY = `Orbit your CLI skills.  Build momentum.
Commands add velocity.
Mistakes refine orbit. Practice becomes instinct
when repetition builds momentum.`;

const HomeHeroSection = () => {
  return (
    <Flex direction="column" gap={7} align="flexStart">
      <Flex direction="column" gap={4.7} align="flexStart" width="100%">
        <IcHomeLogo className={styles.logo} />
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
