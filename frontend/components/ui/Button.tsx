import { ButtonProps } from '@/types/btn.types';

export const Button = ( { label, icon, variant = 'primary', className, ...props }: ButtonProps ) => {

  const baseStyles = "w-full h-12 rounded-md font-bold tracking-tight shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2";

  const variants = {
    primary: "text-white",
    secondary: "bg-[#1b2027] text-[#e0e6f1] hover:bg-[#20262f] border border-[#424851]/30"
  };

  const gradientStyle = variant === 'primary'
    ? { background: 'linear-gradient(135deg, #b9c7e5 0%, #3a4760 100%)' }
    : {};

  return (
    <button
      className={`${ baseStyles } ${ variants[ variant ] } ${ className }`}
      style={gradientStyle}
      {...props}
    >
      <span>{label}</span>
      {icon && <span className="material-symbols-outlined text-sm">{icon}</span>}
    </button>
  );
};
