import { Inter, Roboto } from "next/font/google";
import Todo from "@/components/Todo";
import { useEffect, useState } from "react";
import axios from "axios";
import { PopupEncloser } from "@/components/PopupEncloser";
import { AddTodoPopup } from "@/components/AddTodoPopup";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { TextButton } from "@/components/TextButton";
import { TextButtonStatus } from "../../types";
import { AnimatedBackground } from "@/components/AnimateBackground";

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
      className={`flex min-h-screen flex-col px-5 lg:px-10 items-center ${inter.className} relative`}>
      <AnimatedBackground />
      <div className="flex justify-between gap-5 items-center w-full py-4 z-10">
        <p className="text-xl font-serif">Todo App</p>
        <div className="flex flex-wrap justify-end gap-3 items-center">
          <div>
            <TextButton
              label={"Add task"}
              status={TextButtonStatus.PRIMARY}
              action={() => {
                setIsPopupOpen(true);
              }}
            />
          </div>
          <div>
            <TextButton
              label={"Delete complete"}
              status={TextButtonStatus.SECONDARY}
              action={deleteAll}
            />
          </div>
        </div>
      </div>
      <div className="w-full z-10">
        {isLoading ? (
          <Player
            autoplay
            loop
            src={"./assets/loading-animation.json"}
            style={{ height: "600px", width: "300px" }}>
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
        ) : (
          <Todo list={list} refetch={getData} />
        )}
      </div>
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
