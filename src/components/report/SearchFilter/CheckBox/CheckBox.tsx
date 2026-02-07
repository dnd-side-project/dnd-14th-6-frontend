import { IcCheckBox, IcCheckBoxDefault } from "@/assets/icons/colored";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import { container } from "./CheckBox.css";

interface CheckBoxProps {
  selected: boolean;
  label: string;
  onChange?: () => void;
}

const CheckBox = ({ selected, label, onChange }: CheckBoxProps) => {
  return (
    <label className={container}>
      <input type="checkbox" checked={selected} onChange={onChange} hidden />

      <Flex align="center" gap={1.2}>
        {selected ? <IcCheckBox size={14} /> : <IcCheckBoxDefault size={14} />}
        <Text
          variant="caption2"
          color={selected ? "coolgrey_40" : "coolgrey_80"}
        >
          {label}
        </Text>
      </Flex>
    </label>
  );
};

export default CheckBox;
