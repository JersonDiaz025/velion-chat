export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  customRightIcons?: React.ReactNode;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  rightIcons?: React.ReactNode;
}
