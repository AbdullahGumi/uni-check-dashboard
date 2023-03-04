import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full px-4 py-2 tracking-wide   text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-400 focus:outline-none "
    >
      {children}
    </button>
  );
}

export default Button;
