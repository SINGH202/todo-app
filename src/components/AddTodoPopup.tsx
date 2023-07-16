import axios from "axios";
import { PopupEncloser } from "./PopupEncloser";
import { useState } from "react";
import { AddTodoFormPopup, TodoProps } from "../../types";

export const AddTodoPopup = ({ close }: AddTodoFormPopup) => {
  const [formData, setFormData] = useState<TodoProps>({
    title: "",
    date: "",
    time: "",
    status: false,
  });
  const api = "https://e-commerce-backend-20lo.onrender.com/api/todo";

  const postData = () => {
    if (
      formData?.title !== "" &&
      formData?.date !== "" &&
      formData?.time !== ""
    ) {
      // console.log(data)
      axios({
        method: "post",
        url: api,
        data: formData,
      }).then((res: any) => {
        close();
        // console.log(res.data)
      });
      // .then(getData);
    } else {
      alert("Fill all feilds");
    }
  };
  return (
    <div className="flex flex-col items-center p-10 gap-5 bg-white text-black rounded-xl">
      <input
        className="p-1.5 border border-gray-500 rounded-lg px-2 w-full"
        placeholder="Title"
        type="text"
        name="title"
        id="title"
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <input
        className="p-1.5 border border-gray-500 rounded-lg px-2 w-full"
        type="date"
        name="date"
        id="date"
        onChange={(e) => {
          setFormData({ ...formData, date: e.target.value });
        }}
      />
      <input
        className="p-1.5 border border-gray-500 rounded-lg px-2 w-full"
        type="time"
        name="time"
        id="time"
        onChange={(e) => {
          setFormData({ ...formData, time: e.target.value });
        }}
      />

      <div className="flex gap-5 items-center justify-end text-white w-full">
        <button
          className="rounded-lg bg-yellow-600 w-fit px-5"
          onClick={() => {
            close();
          }}>
          Close
        </button>
        <button
          className="rounded-lg bg-green-500 w-fit px-5"
          onClick={postData}>
          Add
        </button>
      </div>

      {/* <button onClick={deleteAll}>Delete all complete Tasks</button> */}
      {/* <input type="checkbox"  onChange={(e) => seStatus(!status)}/> */}
      {/* <input
    type=checkbox"
    value="check"
    onChange={(e) => this.setState({check: !check.value})}
  />  */}
    </div>
  );
};
