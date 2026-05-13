import { JSX, ReactNode } from 'react';

export type TitleProps = {
    children?: React.ReactNode;
    text?: string;
    as?: keyof JSX.IntrinsicElements;
    className?: string;
    id?: string;
};

export interface NotResultProps {
    className: string;
    text: string;
    icon: ReactNode;
}
