"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IcHeaderLogin from "@/assets/icons/colored/IcHeaderLogin";
import IcHeaderLogo from "@/assets/icons/colored/IcHeaderLogo";
import type { UserInfo } from "@/types/user";
import Text from "../Text/Text";
import * as styles from "./Header.css";

interface HeaderProps {
  fixed?: boolean;
  userInfo?: UserInfo | null;
}

const NAV_ITEMS = [
  { label: "Home", href: "/", disabled: false },
  { label: "Report", href: "/report", disabled: false },
  { label: "Ranking", href: "/ranking", disabled: false },
  { label: "Setting", href: "/setting", disabled: true },
] as const;

const Header = ({ fixed = true, userInfo = null }: HeaderProps) => {
  const pathname = usePathname();
  const isLoggedIn = userInfo !== null;

  return (
    <header className={styles.header({ fixed })}>
      <div className={styles.leftSection}>
        <Link href="/">
          <IcHeaderLogo width={92} height={38} />
        </Link>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) =>
          item.disabled ? (
            <span
              key={item.label}
              className={styles.navItem({ disabled: true })}
            >
              {item.label}
            </span>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className={styles.navItem({ active: pathname === item.href })}
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>

      <div className={styles.rightSection}>
        {isLoggedIn ? (
          <div className={styles.profileSection}>
            <Text variant="caption12" color="coolgrey_40">
              {userInfo.nickname}
            </Text>
            {userInfo.profileImage ? (
              <div className={styles.profileImageWrapper}>
                <Image
                  src={userInfo.profileImage}
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
            <Text
              as="span"
              variant="caption10"
              color="primary_default"
              className={styles.loginText}
            >
              Log In
            </Text>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
