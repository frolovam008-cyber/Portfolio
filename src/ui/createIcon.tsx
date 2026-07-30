import React from "react";

export type IconProps = {
  className?: string;
};

export const createIcon = ({
  viewBox,
  content,
}: {
  viewBox: string;
  content: React.ReactNode;
}) => {
  const Icon = ({  className }: IconProps) => {
    return (
      <svg
        viewBox={viewBox}
        className={className}
        fill="currentColor"
      >
        {content}
      </svg>
    );
  };

  return Icon;
};