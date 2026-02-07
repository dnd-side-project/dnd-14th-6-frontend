import { IcFilterDefault, IcFilterSelected } from "@/assets/icons/colored";
import { triggerButton } from "./SearchFilterTriggerIcon.css";

interface SearchFilterTriggerIconProps {
  selected: boolean;
  onClick: () => void;
}

const SearchFilterTriggerIcon = ({
  selected,
  onClick,
}: SearchFilterTriggerIconProps) => {
  return (
    <button type="button" className={triggerButton} onClick={onClick}>
      {selected ? (
        <IcFilterSelected size={50} />
      ) : (
        <IcFilterDefault size={50} />
      )}
    </button>
  );
};

export default SearchFilterTriggerIcon;
