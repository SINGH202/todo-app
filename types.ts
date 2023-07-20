export enum TextButtonStatus {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  SUCCESS = "SUCCESS",
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
