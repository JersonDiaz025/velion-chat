import React from 'react';
import NextLink, { LinkProps } from 'next/link';

interface Props extends LinkProps {
    children: React.ReactNode;
    className?: string;
}

const Link = ({ children, className, ...props }: Props) => {
    return (
        <NextLink className={className} {...props}>
            {children}
        </NextLink>
    );
};

export default Link;
