import { useState, useEffect } from "react";
import { TodoTableProps } from "../../types";

const axios = require("axios");

function Todo({ list, refetch }: TodoTableProps) {
  let n = 1;
  console.log(list);
  const api = `https://e-commerce-backend-20lo.onrender.com/api/todo`;

  return (
    <>
      <div className="hidden md:flex">
        <table id="table todo-card">
          <thead>
            <tr>
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
                  <td>{e.status ? "Complete" : "Incomplete"}</td>
                  <td>
                    <button
                      className="rounded-lg w-full py-1.5 bg-[#f0ad4e]"
                      onClick={() => {
                        try {
                          axios
                            .put(api + "/" + e._id, {
                              status: !e.status,
                            })
                            .catch((error: any) => console.log(error))
                            .then(refetch);
                        } catch (error) {
                          console.log(error);
                        }
                      }}>
                      Change
                    </button>
                  </td>
                  <td>
                    <button
                      className="rounded-lg w-full py-1.5 bg-[#b73c33]"
                      onClick={() => {
                        try {
                          axios.delete(api + "/" + e._id).then(refetch);
                        } catch (error) {
                          console.log(error);
                        }
                      }}>
                      Delete
                    </button>
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
            {/* <td>Index</td>
              <td>Title</td>
              <td>Time</td>
              <td>Date</td>
              <td>Status</td>
              <td>Actions</td>
              <td>Delete Task</td> */}

            {/* <div className="flex flex-col gap-0">
              <span className="text-sm">Title</span>
              <span className="text-lg uppercase">{item?.title}</span>
            </div> */}
            <TodoCardContent label={"Title"} content={item?.title} />
            <TodoCardContent label={"Date"} content={item?.date} />
            <TodoCardContent label={"Time"} content={item?.time} />
            <TodoCardContent
              label={"Status"}
              content={item?.status ? "Complete" : "Incomplete"}
            />
            <button
              className="rounded-lg w-full py-1.5 bg-[#f0ad4e]"
              onClick={() => {
                try {
                  axios
                    .put(api + "/" + item?._id, {
                      status: !item?.status,
                    })
                    .catch((error: any) => console.log(error))
                    .then(refetch);
                } catch (error) {
                  console.log(error);
                }
              }}>
              Change
            </button>
            <button
              className="rounded-lg w-full py-1.5 bg-[#b73c33]"
              onClick={() => {
                try {
                  axios.delete(api + "/" + item?._id).then(refetch);
                } catch (error) {
                  console.log(error);
                }
              }}>
              Delete
            </button>
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
    <div className="flex flex-col gap-0">
      <span className="text-sm">{label}</span>
      <span className="text-base  uppercase">{content}</span>
    </div>
  );
};

export default Todo;
