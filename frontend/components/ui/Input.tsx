import { InputProps } from "@/types/input.types";

export const Input = ( { hasError, className, ...props }: InputProps ) => {
  return (
    <input
      {...props}
      className={`w-full bg-[#161a1f] h-12 px-4 rounded-md outline-none transition-all
                  text-[#e0e6f1] placeholder-secondary/40 focus:ring-1 ${ hasError
          ? "border border-red-500 focus:ring-red-500/20"
          : "border border-transparent focus:ring-[#b9c7e5]/20"
        }${ className }`}

    />
  );
};
