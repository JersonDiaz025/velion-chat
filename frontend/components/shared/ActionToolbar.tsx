import React from 'react';

interface ActionToolbarProps {
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    className?: string;
}

const ActionToolbar = ({ leftContent, rightContent, className = '' }: ActionToolbarProps) => {
    return (
        <div
            className={`flex items-center justify-between w-full p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 ${className}`}
        >
            <div className='flex items-center gap-4'>{leftContent}</div>
            <div className='flex items-center gap-2'>{rightContent}</div>
        </div>
    );
};

export default ActionToolbar;
