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

type TierRankingSectionProps =
  | { variant: "tier"; tier: Tier }
  | { variant: "ranking"; ranking: number };

const VARIANT_LABEL = {
  tier: "티어",
  ranking: "랭킹",
} as const;

function getValue(props: TierRankingSectionProps) {
  if (props.variant === "tier") return props.tier.name;
  return `${props.ranking}위`;
}

export default function TierRankingSection(props: TierRankingSectionProps) {
  const { variant } = props;

  return (
    <Link href="/report/ranking" className={linkWrapper}>
      <DashboardCard className={cardFullHeight}>
        <div className={content}>
          <div className={header}>
            <Text variant="heading4" color="coolgrey_40">
              {VARIANT_LABEL[variant]}
            </Text>
            <IcArrowLink size={24} />
          </div>
          <Text variant="display1" color="coolgrey_10">
            {getValue(props)}
          </Text>
          <div className={imagePlaceholder}>
            {variant === "tier" && props.tier.imageUrl && (
              <Image
                src={props.tier.imageUrl}
                alt={`${props.tier.name} 티어 이미지`}
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
