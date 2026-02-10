import Text from "@/components/common/Text/Text";
import type { Command } from "./CommandInput";
import * as styles from "./CommandInput.css";

interface CommandDropdownProps {
  listboxId: string;
  commands: Command[];
  activeIndex: number;
  onSelect: (href: string) => void;
  onHover: (index: number) => void;
}

const CommandDropdown = ({
  listboxId,
  commands,
  activeIndex,
  onSelect,
  onHover,
}: CommandDropdownProps) => {
  return (
    <div className={styles.dropdownBorder}>
      <div id={listboxId} role="listbox" className={styles.dropdown}>
        {commands.map((cmd, index) => (
          <button
            type="button"
            id={`command-option-${index}`}
            role="option"
            aria-selected={index === activeIndex}
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
