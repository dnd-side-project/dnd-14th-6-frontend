"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Text from "../Text/Text";
import * as styles from "./Header.css";

interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  profileImage?: string;
  onLoginClick?: () => void;
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Report", href: "/report" },
  { label: "Ranking", href: "/report/ranking" },
  { label: "Setting", href: "/" },
] as const;

const Header = ({
  isLoggedIn = false,
  username,
  profileImage,
  onLoginClick,
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
    <header className={styles.header}>
      <div className={styles.logoPlaceholder} />

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={styles.navItem({ active: isActive(item.label) })}
          >
            <Text
              variant="caption12"
              color={isActive(item.label) ? "coolgrey_20" : "coolgrey_80"}
            >
              {item.label}
            </Text>
          </Link>
        ))}
      </nav>

      <div className={styles.rightSection}>
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
          <button
            type="button"
            className={styles.loginButton}
            onClick={onLoginClick}
          >
            <Text variant="caption10" color="primary_default">
              Log In
            </Text>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
