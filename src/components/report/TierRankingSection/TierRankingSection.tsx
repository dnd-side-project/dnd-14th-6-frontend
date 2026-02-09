import Image from "next/image";
import Link from "next/link";
import { IcArrowLink } from "@/assets/icons/colored";
import Text from "@/components/common/Text/Text";
import DashboardCard from "@/components/report/DashboardCard/DashboardCard";
import type { Tier } from "@/types/report";
import {
  cardFullHeight,
  content,
  header,
  imagePlaceholder,
  linkWrapper,
} from "./TierRankingSection.css";

interface TierRankingSectionProps {
  variant: "tier" | "ranking";
  tier?: Tier;
  ranking?: number;
}

const VARIANT_CONFIG = {
  tier: {
    label: "티어",
    getValue: (props: TierRankingSectionProps) => props.tier?.name ?? "-",
  },
  ranking: {
    label: "랭킹",
    getValue: (props: TierRankingSectionProps) =>
      props.ranking !== undefined ? `${props.ranking}위` : "-",
  },
} as const;

export default function TierRankingSection(props: TierRankingSectionProps) {
  const { variant, tier } = props;
  const config = VARIANT_CONFIG[variant];

  return (
    <Link href="/report/ranking" className={linkWrapper}>
      <DashboardCard className={cardFullHeight}>
        <div className={content}>
          <div className={header}>
            <Text variant="heading4" color="coolgrey_40">
              {config.label}
            </Text>
            <IcArrowLink size={24} />
          </div>
          <Text variant="display1" color="coolgrey_10">
            {config.getValue(props)}
          </Text>
          <div className={imagePlaceholder}>
            {variant === "tier" && tier?.imageUrl && (
              <Image
                src={tier.imageUrl}
                alt={`${tier.name} 티어 이미지`}
                fill
                style={{ objectFit: "contain" }}
              />
            )}
            {variant === "ranking" && (
              <Image
                src="/assets/images/ranking-placeholder.png"
                alt="랭킹 그래프"
                fill
                style={{ objectFit: "contain" }}
              />
            )}
          </div>
        </div>
      </DashboardCard>
    </Link>
  );
}
