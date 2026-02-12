"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IcHeaderLogin from "@/assets/icons/colored/IcHeaderLogin";
import IcHeaderLogo from "@/assets/icons/colored/IcHeaderLogo";
import Text from "../Text/Text";
import * as styles from "./Header.css";

interface HeaderProps {
  fixed?: boolean;
  isLoggedIn?: boolean;
  username?: string;
  profileImage?: string;
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Report", href: "/report" },
  { label: "Ranking", href: "/report/ranking" },
  { label: "Setting", href: "/login" },
] as const;

const Header = ({
  fixed = true,
  isLoggedIn = false,
  username,
  profileImage,
}: HeaderProps) => {
  const pathname = usePathname();

  const isActive = (label: string) => {
    if (label === "Ranking") {
      return pathname === "/report/ranking";
    }
    if (label === "Report") {
      return pathname === "/report";
    }
    if (label === "Home") {
      return pathname === "/";
    }
    return false;
  };

  return (
    <header className={styles.header({ fixed })}>
      <Link href="/">
        <IcHeaderLogo width={92} height={38} />
      </Link>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={styles.navItem({ active: isActive(item.label) })}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {isLoggedIn ? (
        <div className={styles.profileSection}>
          <Text variant="caption12" color="coolgrey_40">
            {username}
          </Text>
          {profileImage ? (
            <Image
              src={profileImage}
              alt="profile"
              width={48}
              height={48}
              className={styles.profileImage}
            />
          ) : (
            <div className={styles.profilePlaceholder} />
          )}
        </div>
      ) : (
        <Link href="/login" className={styles.loginLink}>
          <IcHeaderLogin size={18} />
          <Text as="span" variant="caption10" color="primary_default">
            Log In
          </Text>
        </Link>
      )}
    </header>
  );
};

export default Header;
