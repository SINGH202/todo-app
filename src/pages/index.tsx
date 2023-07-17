import { Inter, Roboto } from "next/font/google";
import Todo from "@/components/Todo";
import { useEffect, useState } from "react";
import axios from "axios";
import { PopupEncloser } from "@/components/PopupEncloser";
import { AddTodoPopup } from "@/components/AddTodoPopup";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const inter = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

  const api = `https://e-commerce-backend-20lo.onrender.com/api/todo`;

  const getData = () => {
    fetch(`${api}`)
      .then((d) => d.json())
      .then((res) => {
        setList(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
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
    setIsLoading(true);
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col px-5 lg:px-10 items-center ${inter.className}`}>
      <div className="flex justify-between gap-2 items-center w-full py-4">
        <span className="text-xl font-serif">Todo App</span>
        <div className="flex flex-wrap justify-end gap-3 items-center">
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
      {isLoading ? (
        <Player
          autoplay
          loop
          src={"./assets/animation_lk6lewjs.json"}
          style={{ height: "300px", width: "300px" }}>
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      ) : (
        <Todo list={list} refetch={getData} />
      )}
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
