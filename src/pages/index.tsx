import { Roboto } from "next/font/google";
import Todo from "@/components/Todo";
import { useEffect, useState } from "react";
import axios from "axios";
import { PopupEncloser } from "@/components/PopupEncloser";
import { AddTodoPopup } from "@/components/AddTodoPopup";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { AnimatedBackground } from "@/components/AnimateBackground";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { LoginForm } from "@/components/LoginForm";
import { endPoint } from "../../app.config";
import { useAuthContext } from "@/context/AuthContext";

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
  const { isAuthenticated } = useAuthContext();
  const api = `${endPoint}/todo`;

  const getData = () => {
    setIsLoading(true);
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

  const deleteAll = () => {
    try {
      axios.delete(`${api}/delete-complete`).then(getData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    setIsLoading(true);
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col px-5 lg:px-10 items-center ${inter.className} relative`}>
      <AnimatedBackground />
      <Navbar
        showPopupAction={() => {
          setIsPopupOpen(true);
        }}
        deleteAction={deleteAll}
      />
      {isAuthenticated ? (
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
          ) : list.length === 0 ? (
            <div className="flex justify-center items-center w-full h-screen">
              <Image
                width={500}
                height={500}
                src="/assets/no-data-found.svg"
                alt=""
              />
            </div>
          ) : (
            <Todo list={list} refetch={getData} />
          )}
        </div>
      ) : (
        <LoginForm />
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
