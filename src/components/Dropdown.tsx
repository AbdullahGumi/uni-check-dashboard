import Select from "react-select";

interface OptionType {
  value: string | number;
  label: string;
}

interface IProps {
  label: string;
  setValue: (value: OptionType) => void;
  items: OptionType[];
  helperText: string;
}

export default function Dropdown({
  label,
  setValue,
  items,
  helperText,
  ...otherProps
}: IProps & React.HTMLAttributes<HTMLDivElement>) {
  const handleChange = (selectedOption: any) => {
    setValue({ label: selectedOption.label, value: selectedOption.value });
  };

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
        }}
        placeholder={label}
        options={items}
        onChange={handleChange}
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
