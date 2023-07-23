import { useState } from "react";
import { InputWithLabel } from "./InputWithLabel";
import { UserFormProps, TextButtonStatus } from "../../types";
import { TextButton } from "./TextButton";
import { endPoint } from "../../app.config";
import axios from "axios";
import { setJwtToLocal } from "../../services/user.services";
import { useAuthContext } from "@/context/AuthContext";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
export const LoginForm = () => {
  const { setIsAuthenticated } = useAuthContext();
  const [userFormData, setUserFormData] = useState<UserFormProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const addUser = () => {
    if (
      !userFormData?.email ||
      !userFormData?.password ||
      !userFormData?.confirmPassword ||
      userFormData?.password !== userFormData?.confirmPassword
    ) {
      return;
    }
    setIsLoading(true);
    axios({
      method: "post",
      url: `${endPoint}/auth/register`,
      data: { email: userFormData?.email, password: userFormData?.password },
    }).then((res: any) => {
      setIsLoading(false);
      loginUser();
    });
  };
  const loginUser = () => {
    if (!userFormData?.email || !userFormData?.password) {
      return;
    }
    setIsLoading(true);
    axios({
      method: "post",
      url: `${endPoint}/auth/login`,
      data: { email: userFormData?.email, password: userFormData?.password },
    }).then((res: any) => {
      setIsLoading(false);
      setJwtToLocal(res?.data);
      setIsAuthenticated(true);
    });
  };
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full z-10 py-10 max-w-[620px]">
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
        <>
          <span className="w-full text-3xl font-semibold font-serif">
            {isNewUser ? "Create user" : "Login"}
          </span>
          <InputWithLabel
            label={"Email"}
            placeholder={"example@gmail.com"}
            type={"email"}
            onChange={(e: any) => {
              setUserFormData({ ...userFormData, email: e.target.value });
            }}
            value={userFormData?.email}
          />
          <InputWithLabel
            label={"Password"}
            placeholder={"*******"}
            type={"password"}
            onChange={(e: any) => {
              setUserFormData({ ...userFormData, password: e.target.value });
            }}
            value={userFormData?.password}
          />
          {isNewUser && (
            <InputWithLabel
              label={"Confirm password"}
              placeholder={"*******"}
              type={"password"}
              onChange={(e: any) => {
                setUserFormData({
                  ...userFormData,
                  confirmPassword: e.target.value,
                });
              }}
              value={userFormData?.confirmPassword}
            />
          )}
          <div className="flex items-center justify-between w-full">
            <div className="">
              <TextButton
                label={isNewUser ? "Already a user" : "Create a account"}
                status={TextButtonStatus.PLAIN}
                action={() => {
                  setIsNewUser(!isNewUser);
                }}
              />
            </div>
            <div className="w-28">
              <TextButton
                label={isNewUser ? "Create user" : "Login"}
                action={isNewUser ? addUser : loginUser}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
