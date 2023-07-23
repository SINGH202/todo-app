import { ReactNode } from "react";

export enum TextButtonStatus {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  SUCCESS = "SUCCESS",
  SECONDARY_PLAIN = "SECONDARY_PLAIN",
  PLAIN = "PLAIN",
}

export type TodoProps = {
  _id?: string;
  title: string;
  date: string;
  time: string;
  status?: boolean;
};

export type TodoTableProps = {
  list: TodoProps[];
  refetch: () => void;
};

export type AddTodoFormPopup = {
  close: () => void;
};

export type TextButtonProps = {
  label: string;
  action: () => void;
  status?: TextButtonStatus;
};

export type NavbarProps = {
  showPopupAction: () => void;
  deleteAction: () => void;
};

export type TaskTableProps = {
  list: TodoProps[];
  refetch: () => void;
};

export type TaskProps = {
  task: TodoProps;
  refetch: () => void;
};

export type PopupEncloserProps = {
  children: any;
  show: boolean;
  close: (Option: boolean) => void;
};

export type TodoCardContentProps = {
  label: string;
  content: string;
};

export type InputWithLabelProps = {
  label: string;
  placeholder: string;
  description?: string;
  isInvalid?: boolean;
  errorText?: string;
  isDisabled?: boolean;
  type: "text" | "number" | "date" | "password" | "email";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  handleKeyDown?: (value: any) => void;
  actionBtn?: ReactNode;
};

export type UserFormProps = {
  email: string;
  password: string;
  confirmPassword?: string;
};
