import { FC } from "react";

type ButtonWithIconProps = {
  text?: string;
  icon: string;
  className: string;
  onClick?: () => void;
}

const Button:FC<ButtonWithIconProps> = ({ text, icon, className, onClick }) => {
  return (
    <button onClick={onClick} className={className}>
      <img src={icon} alt=""/>
      <span className="text">{text}</span>
    </button>
  );
};

export default Button;
