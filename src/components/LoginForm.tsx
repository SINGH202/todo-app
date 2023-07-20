import { useState } from "react";
import { InputWithLabel } from "./InputWithLabel";
import { UserFormProps, TextButtonStatus } from "../../types";
import { TextButton } from "./TextButton";
export const LoginForm = () => {
  const [userFormData, setUserFormData] = useState<UserFormProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isNewUser, setIsNewUser] = useState(false);
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full z-10 py-10 max-w-[620px]">
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
            setUserFormData({ ...userFormData, password: e.target.value });
          }}
          value={userFormData?.password}
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
            action={isNewUser ? () => {} : () => {}}
          />
        </div>
      </div>
    </div>
  );
};
