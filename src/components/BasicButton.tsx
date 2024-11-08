import React from "react";

export interface BasicButtonProps {
  label: string;
}

const BasicButton = (props: BasicButtonProps) => {
  return <button>{props.label}</button>;
};

export default BasicButton;
