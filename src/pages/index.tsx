import { Inter } from "next/font/google";
import Todo from "@/components/Todo";
import { useEffect, useState } from "react";
import axios from "axios";
import { PopupEncloser } from "@/components/PopupEncloser";
import { AddTodoPopup } from "@/components/AddTodoPopup";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [list, setList] = useState([]);

  const api = `https://e-commerce-backend-20lo.onrender.com/api/todo`;

  const getData = () => {
    fetch(`${api}`)
      .then((d) => d.json())
      .then((res) => {
        setList(res);
      });
  };

  const removeComplete = (e: any) => {
    if (e.status == true) {
      axios.delete(api + "/" + e._id);
    }
  };

  const deleteAll = () => {
    // setList(list.filter(removeComplete));
    // try {
    //   axios.delete(api).then(getData);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col px-5 lg:px-10 items-center ${inter.className}`}>
      <div className="flex justify-between items-center w-full p-4">
        <span className="text-xl font-serif">Todo App</span>
        <div className="flex gap-3 items-center">
          <button
            className="rounded-lg bg-[#f0ad4e]"
            onClick={() => {
              setIsPopupOpen(true);
            }}>
            Add new task
          </button>
          <button onClick={deleteAll} className="rounded-lg bg-[#b73c33]">
            Delete all
          </button>
        </div>
      </div>
      <Todo list={list} />
      <PopupEncloser
        show={isPopupOpen}
        close={() => {
          setIsPopupOpen(false);
        }}>
        <AddTodoPopup
          close={() => {
            setIsPopupOpen(false);
            getData();
          }}
        />
      </PopupEncloser>
    </main>
  );
}
