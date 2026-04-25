import { TitleProps } from "@/types/title.types";

export default function Title( {
  children,
  text,
  as: Tag = "h1",
  className = "",
  id,
}: TitleProps ) {
  const content = children || text;

  if ( !content ) return null;

  return (
    <Tag
      id={id}
      className={`font-semibold tracking-tight ${ className }`}
    >
      {content}
    </Tag>
  );
}
