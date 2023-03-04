import React from "react";

interface InputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  type: string;
  helperText?: string;
}
function Input({
  label,
  value,
  setValue,
  type,
  helperText,
  ...otherProps
}: InputProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="mb-2" {...otherProps}>
      <label className="block text-sm font-semibold text-gray-800">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
        className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
      />
      <span className="text-black text-xs font-semibold">{helperText}</span>
    </div>
  );
}

export default Input;
