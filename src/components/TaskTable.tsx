import axios from "axios";
import { list } from "postcss";
import { TaskTableProps, TextButtonStatus } from "../../types";
import { TextButton } from "./TextButton";
import { endPoint } from "../../app.config";

export const TaskTable = ({ list, refetch }: TaskTableProps) => {
  let n = 1;
  const api = `${endPoint}/todo`;

  return (
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
  );
};
