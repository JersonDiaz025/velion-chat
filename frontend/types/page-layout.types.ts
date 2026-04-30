export interface PageLayoutProps {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
  customRightIcons?: React.ReactNode;
  children: React.ReactNode;
}
