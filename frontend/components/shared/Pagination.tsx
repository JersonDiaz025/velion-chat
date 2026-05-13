import { PaginationProps } from '@/types/pagination.types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
    currentPage,
    totalPages,
    canNavigate,
    onPageChange,
    isDisabled = false,
    showIconsOnly = false,
    className = '',
}: PaginationProps) => {
    if (!canNavigate) return null;

    const btnBaseStyles =
        'flex items-center cursor-pointer gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed font-medium text-sm border border-outline-variant/10';

    return (
        <div className={`flex items-center justify-center gap-6 ${className}`}>
            <button
                disabled={currentPage <= 1 || isDisabled}
                onClick={() => onPageChange(currentPage - 1)}
                className={btnBaseStyles}
                aria-label='Página anterior'
            >
                <ChevronLeft size={18} />
                {!showIconsOnly && <span>Anterior</span>}
            </button>

            <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-lg'>
                    {currentPage}
                </span>
                <span className='text-sm text-secondary'>de {totalPages}</span>
            </div>

            <button
                disabled={currentPage >= totalPages || isDisabled}
                onClick={() => onPageChange(currentPage + 1)}
                className={btnBaseStyles}
                aria-label='Siguiente página'
            >
                {!showIconsOnly && <span>Siguiente</span>}
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default Pagination;
