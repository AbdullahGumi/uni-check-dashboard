import { ButtonHTMLAttributes, ReactNode } from "react";
import CircularProgress from "@mui/material/CircularProgress";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
};

function Button({ children, disabled, isLoading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full px-4 py-2 text-white bg-black rounded-md hover:bg-slate-400 focus:outline-none justify-center items-center flex ${
        disabled && "hover:bg-black"
      }`}
    >
      {isLoading ? (
        <CircularProgress
          style={{
            color: "white",
            width: "15px",
            height: "15px",
          }}
        />
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
