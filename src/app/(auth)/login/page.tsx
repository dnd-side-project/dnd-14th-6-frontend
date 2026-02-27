import Image from "next/image";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import LoginButton from "@/components/login/LoginButton/LoginButton";
import * as styles from "./page.css";

interface LoginPageProps {
  searchParams: Promise<{
    redirect?: string | string[];
    gameSessionId?: string | string[];
  }>;
}

function normalize(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const rawRedirect = normalize(params.redirect) ?? "/";
  const gameSessionId = normalize(params.gameSessionId);
  const redirect =
    rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/";

  return (
    <Flex
      className={styles.pageWrapper}
      direction="column"
      align="center"
      paddingTop={4.6}
      paddingBottom={5.4}
    >
      <Text className={styles.title} variant="display5" color="coolgrey_10">
        {"지금 바로 로그인하고\n모든 기능을 경험해 보세요!"}
      </Text>
      <div className={styles.planetSection}>
        <Image
          className={styles.circleImage}
          src="/assets/images/login-circle.png"
          alt=""
          width={534}
          height={534}
        />
        <Image
          className={styles.planetImage}
          src="/assets/images/planet-login.png"
          alt=""
          width={1639}
          height={1695}
        />
      </div>
      <Flex direction="column" gap={1.5} align="center">
        <LoginButton
          provider="github"
          redirectUrl={redirect}
          gameSessionId={gameSessionId}
        />
        <LoginButton
          provider="google"
          redirectUrl={redirect}
          gameSessionId={gameSessionId}
        />
      </Flex>
    </Flex>
  );
}
