import Flex from "@/components/common/Flex/Flex";
import HomeHeroSection from "@/components/home/HomeHeroSection/HomeHeroSection";
import LogLineSection from "@/components/home/LogLineSection/LogLineSection";

export default function Home() {
  return (
    <Flex width="100%" direction="column" padding={5} gap={15}>
      <HomeHeroSection />
      <LogLineSection />
    </Flex>
  );
}
