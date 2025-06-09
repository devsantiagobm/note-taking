import { HTMLProps } from "react";
import "./icon.atom.scss";
import { IconType } from "react-icons";

interface Props extends HTMLProps<"div"> {
  icon: IconType
  size?: number;
  color?: string
}

export function Icon({ icon: IconComponent, size = 16, color, className }: Props) {
  return (
    <div className={`icon ${className ?? ""}`}>
      <IconComponent size={size} color={color} />
    </div>
  );
}
