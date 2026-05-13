export interface PageHeaderProps {
    value?: string;
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
    customRightIcons?: React.ReactNode;
    searchPlaceholder?: string;
    onSearch?: (value: string) => void;
    rightIcons?: React.ReactNode;
}
