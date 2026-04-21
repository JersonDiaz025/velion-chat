export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary';
}
