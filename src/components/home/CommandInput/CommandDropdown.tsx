import Text from "@/components/common/Text/Text";
import * as styles from "./CommandInput.css";

interface Command {
  label: string;
  href: string;
}

interface CommandDropdownProps {
  commands: Command[];
  activeIndex: number;
  onSelect: (href: string) => void;
  onHover: (index: number) => void;
}

const CommandDropdown = ({
  commands,
  activeIndex,
  onSelect,
  onHover,
}: CommandDropdownProps) => {
  return (
    <div className={styles.dropdownBorder}>
      <div className={styles.dropdown}>
        {commands.map((cmd, index) => (
          <button
            type="button"
            key={cmd.label}
            className={styles.dropdownItem({ active: index === activeIndex })}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelect(cmd.href)}
            onMouseEnter={() => onHover(index)}
          >
            <Text as="span" variant="body11" color="primary_50">
              {cmd.label}
            </Text>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommandDropdown;
