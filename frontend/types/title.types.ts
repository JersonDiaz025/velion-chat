import { JSX } from "react";

export type TitleProps = {
  children?: React.ReactNode;
  text?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  id?: string;
};
