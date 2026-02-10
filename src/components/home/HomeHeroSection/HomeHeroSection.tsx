import IcHomeLogo from "@/assets/icons/colored/IcHomeLogo";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import CommandInput from "@/components/home/CommandInput/CommandInput";
import * as styles from "./HomeHeroSection.css";

const HomeHeroSection = () => {
  return (
    <Flex direction="column" gap={7} align="flexStart">
      <Flex direction="column" gap={4.7} align="flexStart" width="100%">
        <IcHomeLogo className={styles.logo} />
        <Text variant="subtitle5" color="coolgrey_100" className={styles.copyText}>
          {"Orbit your CLI skills.  Build momentum.\nCommands add velocity.\nMistakes refine orbit. Practice becomes instinct\nwhen repetition builds momentum."}
        </Text>
      </Flex>
      <CommandInput />
    </Flex>
  );
};

export default HomeHeroSection;
