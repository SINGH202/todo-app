import axios from "axios";
import { TaskProps, TextButtonStatus, TodoProps } from "../../types";
import { TextButton } from "./TextButton";
import { TodoCardContent } from "./TodoCardContent";

export const TodoCard = ({ task, refetch }: TaskProps) => {
  const api = `https://e-commerce-backend-20lo.onrender.com/api/todo`;
  const { time, title, date, status, _id } = task;
  return (
    <div className="grid grid-cols-2 gap-y-3 p-4 rounded-xl todo-card">
      <TodoCardContent label={"Title"} content={title} />
      <TodoCardContent label={"Date"} content={date} />
      <TodoCardContent label={"Time"} content={time} />
      <TodoCardContent
        label={"Status"}
        content={status ? "Complete" : "Pending"}
      />
      <div className=" mr-2 sm:w-1/3">
        <TextButton
          label={status ? "Done" : "Move to done"}
          status={status ? TextButtonStatus.SUCCESS : TextButtonStatus.PRIMARY}
          action={() => {
            if (status) return;
            try {
              axios
                .put(`${api}/${_id}`, {
                  status: !status,
                })
                .catch((error: any) => console.log(error))
                .then(refetch);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </div>
      <div className=" sm:w-1/3">
        <TextButton
          label={"Delete"}
          status={TextButtonStatus.SECONDARY}
          action={() => {
            try {
              axios.delete(`${api}/delete-single/${_id}`).then(refetch);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </div>
    </div>
  );
};
