import { InputProps } from "@/types/input.types";


export const Input = ( { className, ...props }: InputProps ) => {
  return (
    <input
      {...props}
      className={`w-full bg-[#161a1f] h-12 px-4 rounded-md border-none
                  focus:ring-1 focus:ring-[#b9c7e5]/20 text-[#e0e6f1]
                  placeholder-secondary/40 outline-none transition-all ${ className }`}
    />
  );
};
