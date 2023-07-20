import { TodoCardContentProps } from "../../types";

export const TodoCardContent = ({ label, content }: TodoCardContentProps) => {
  return (
    <div className="flex flex-col gap-0 text-white">
      <span className="text-sm">{label}</span>
      <span className="text-base  uppercase font-semibold">{content}</span>
    </div>
  );
};
