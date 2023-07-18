import { TextButtonStatus, TodoTableProps } from "../../types";
import { TextButton } from "./TextButton";

const axios = require("axios");

function Todo({ list, refetch }: TodoTableProps) {
  let n = 1;
  const api = `https://e-commerce-backend-20lo.onrender.com/api/todo`;

  return (
    <>
      <div className="hidden md:flex w-full">
        <table
          id="table todo-card"
          className="w-full styled-table font-medium text-black">
          <thead className="">
            <tr className="w-full">
              <td>Index</td>
              <td>Title</td>
              <td>Time</td>
              <td>Date</td>
              <td>Status</td>
              <td>Actions</td>
              <td>Delete Task</td>
            </tr>
          </thead>
          <tbody>
            {list.map((e: any) => {
              return (
                <tr key={e._id}>
                  <td>{n++}</td>
                  <td>{e.title}</td>
                  <td>{e.time}</td>
                  <td>{e.date}</td>
                  <td>{e.status ? "Complete" : "Pending"}</td>
                  <td>
                    <TextButton
                      label={e.status ? "Done" : "Move to done"}
                      status={
                        e.status
                          ? TextButtonStatus.SUCCESS
                          : TextButtonStatus.PRIMARY
                      }
                      action={() => {
                        if (e.status) return;
                        try {
                          axios
                            .put(`${api}/${e?._id}`, {
                              status: !e.status,
                            })
                            .catch((error: any) => console.log(error))
                            .then(refetch);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    />
                  </td>
                  <td>
                    <TextButton
                      label={"Delete"}
                      status={TextButtonStatus.SECONDARY}
                      action={() => {
                        try {
                          axios
                            .delete(`${api}/delete-single/${e._id}`)
                            .then(refetch);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-5 md:hidden w-full ">
        {list.map((item, index) => (
          <div
            key={`small-list-item-${index}`}
            className="grid grid-cols-2 gap-y-3 p-4 rounded-xl todo-card">
            <TodoCardContent label={"Title"} content={item?.title} />
            <TodoCardContent label={"Date"} content={item?.date} />
            <TodoCardContent label={"Time"} content={item?.time} />
            <TodoCardContent
              label={"Status"}
              content={item?.status ? "Complete" : "Pending"}
            />
            <div className=" mr-2 sm:w-1/3">
              <TextButton
                label={item.status ? "Done" : "Move to done"}
                status={
                  item?.status
                    ? TextButtonStatus.SUCCESS
                    : TextButtonStatus.PRIMARY
                }
                action={() => {
                  if (item.status) return;
                  try {
                    axios
                      .put(`${api}/${item?._id}`, {
                        status: !item?.status,
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
                    axios
                      .delete(`${api}/delete-single/${item?._id}`)
                      .then(refetch);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export type TodoCardContentProps = {
  label: string;
  content: string;
};

export const TodoCardContent = ({ label, content }: TodoCardContentProps) => {
  return (
    <div className="flex flex-col gap-0 text-white">
      <span className="text-sm">{label}</span>
      <span className="text-base  uppercase font-semibold">{content}</span>
    </div>
  );
};

export default Todo;
