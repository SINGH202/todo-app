import { TodoTableProps } from "../../types";
import { TodoCard } from "./TaskCard";
import { TaskTable } from "./TaskTable";

function Todo({ list, refetch }: TodoTableProps) {
  return (
    <>
      <TaskTable list={list} refetch={refetch} />
      <div className="flex flex-col gap-5 md:hidden w-full ">
        {list.map((item, index) => (
          <TodoCard
            key={`small-list-item-${index}`}
            task={item}
            refetch={refetch}
          />
        ))}
      </div>
    </>
  );
}

export default Todo;
