export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    canNavigate: boolean;
    onPageChange: (page: number) => void;
    isDisabled?: boolean;
    showIconsOnly?: boolean;
    className?: string;
}
