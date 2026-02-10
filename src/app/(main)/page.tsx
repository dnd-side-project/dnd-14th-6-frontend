import Flex from "@/components/common/Flex/Flex";
import HomeHeroSection from "@/components/home/HomeHeroSection/HomeHeroSection";

export default function Home() {
  return (
    <Flex width="100%" direction="column" padding={5}>
      <HomeHeroSection />
    </Flex>
  );
}
