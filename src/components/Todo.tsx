import { useState, useEffect } from "react";
import { TodoTableProps } from "../../types";

const axios = require("axios");

function Todo({ list }: TodoTableProps) {
  let n = 1;
  // const [status, seStatus] = useState(false);
  let status = false;

  return (
    <table id="table">
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
                    // try {
                    //   axios
                    //     .put(api + "/" + e._id, {
                    //       status: !e.status,
                    //     })
                    //     .catch((error: any) => console.log(error))
                    //     .then(getData);
                    // } catch (error) {
                    //   console.log(error);
                    // }
                  }}>
                  Change
                </button>
              </td>
              <td>
                <button
                  className="rounded-lg w-full py-1.5 bg-[#b73c33]"
                  onClick={() => {
                    // try {
                    //   axios.delete(api + "/" + e._id).then(getData);
                    // } catch (error) {
                    //   console.log(error);
                    // }
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Todo;
