import Select from "react-select";
import { OptionType } from "../types";

interface IProps {
  label: string;
  onChange: (selectedOption: any) => void;
  items: OptionType[];
  helperText: string;
}

export default function Dropdown({
  label,
  onChange,
  items,
  helperText,
  ...otherProps
}: IProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex flex-col" {...otherProps}>
      <Select
        styles={{
          option: (styles) => {
            return {
              ...styles,
              backgroundColor: "#F6F8FA",
              color: "#808080",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "rgb(226 232 240)",
              },
            };
          },
          menuList: (base) => ({
            ...base,

            "::-webkit-scrollbar": {
              width: "0px",
            },
          }),
        }}
        placeholder={label}
        options={items}
        onChange={onChange}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
      <span className="text-black font-semibold text-xs mt-1">
        {helperText}
      </span>
    </div>
  );
}
