export interface PageLayoutProps {
  title: string;
  subtitle?: string;
  loadingText?: string;
  isLoading?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
  customRightIcons?: React.ReactNode;
  children: React.ReactNode;
}
