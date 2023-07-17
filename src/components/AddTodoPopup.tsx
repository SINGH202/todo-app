import axios from "axios";
import { useState } from "react";
import { AddTodoFormPopup, TextButtonStatus, TodoProps } from "../../types";
import { TextButton } from "./TextButton";

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
    <div className="flex flex-col items-center p-10 gap-5 add-todo-popup text-black">
      <input
        className="p-1.5 rounded-lg px-2 w-full"
        placeholder="Title"
        type="text"
        name="title"
        id="title"
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <input
        className="p-1.5 rounded-lg px-2 w-full"
        type="date"
        name="date"
        id="date"
        onChange={(e) => {
          setFormData({ ...formData, date: e.target.value });
        }}
      />
      <input
        className="p-1.5 rounded-lg px-2 w-full"
        type="time"
        name="time"
        id="time"
        onChange={(e) => {
          setFormData({ ...formData, time: e.target.value });
        }}
      />

      <div className="flex gap-5 items-center justify-end text-white w-full">
        <TextButton
          status={TextButtonStatus.SECONDARY}
          label={"Close"}
          action={close}
        />
        <TextButton label={"Add"} action={postData} />
      </div>
    </div>
  );
};
