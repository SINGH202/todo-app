import { TextButtonProps } from "../../types";

export const TextButton = ({ label, action, status }: TextButtonProps) => {
  return (
    <button
      className=""
      onClick={() => {
        action();
      }}>
      {label}
    </button>
  );
};
