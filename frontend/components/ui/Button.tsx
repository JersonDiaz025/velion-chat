import { ButtonProps } from '@/types/btn.types';

export const Button = ({ label, icon, variant = 'primary', className, ...props }: ButtonProps) => {
  const baseStyles =
    'w-full h-12 cursor-pointer rounded-md font-bold tracking-tight shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2';

  const variants = {
    primary: 'text-white cursor-pointer',
    secondary: 'bg-[#1b2027] text-[#e0e6f1] cursor-pointer border border-[#424851]/30',
  };

  return (
    <button
      className={`${className ? className : baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{label}</span>
      {icon && <span className='material-symbols-outlined text-sm'>{icon}</span>}
    </button>
  );
};
