import IcLogin from "@/assets/icons/colored/IcLogin";
import Text from "@/components/common/Text/Text";

import * as styles from "./LoginOverlay.css";

interface LoginOverlayProps {
  onClick: () => void;
}

export default function LoginOverlay({ onClick }: LoginOverlayProps) {
  return (
    <button type="button" className={styles.overlay} onClick={onClick}>
      <IcLogin size={30} />
      <Text variant="body3" color="coolgrey_40">
        로그인하면 전체 내용을 확인할 수 있어요!
      </Text>
    </button>
  );
}
