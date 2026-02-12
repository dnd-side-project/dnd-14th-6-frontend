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

  return (
    <header className={styles.header({ fixed })}>
      <div className={styles.leftSection}>
        <Link href="/">
          <IcHeaderLogo width={92} height={38} />
        </Link>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={styles.navItem({ active: pathname === item.href })}
          >
            {item.label}
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
              <div className={styles.profileImageWrapper}>
                <Image
                  src={profileImage}
                  alt="profile"
                  width={48}
                  height={48}
                  className={styles.profileImage}
                />
              </div>
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
      </div>
    </header>
  );
};

export default Header;
