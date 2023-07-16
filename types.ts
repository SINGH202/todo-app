export type TodoProps = {
  title: string;
  date: string;
  time: string;
  status?: boolean;
};

export type TodoTableProps = {
  list: TodoProps[];
};

export type AddTodoFormPopup = {
  close: () => void;
};
