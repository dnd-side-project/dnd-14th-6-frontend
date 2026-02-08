import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import * as styles from "./Footer.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />
      <Flex direction="column" align="center" gap={1}>
        <Text variant="caption11" color="coolgrey_20">
          Contact
        </Text>
        <Text variant="caption14" color="coolgrey_80">
          Orvit@gmail.com
        </Text>
      </Flex>
    </footer>
  );
};

export default Footer;
