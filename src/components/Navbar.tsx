/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { NavbarProps, TextButtonStatus } from "../../types";
import { TextButton } from "./TextButton";
import { useAuthContext } from "@/context/AuthContext";
import { logout } from "../../services/user.services";

export const Navbar = ({ showPopupAction, deleteAction }: NavbarProps) => {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  return (
    <div className="flex justify-between gap-5 items-center w-full py-4 z-10">
      <img src="/assets/todo-logo.png" alt="" className="rounded-lg h-10 " />
      <div className="flex flex-wrap justify-end gap-3 items-center">
        {isAuthenticated ? (
          <>
            <div>
              <TextButton
                label={"Add task"}
                status={TextButtonStatus.PRIMARY}
                action={showPopupAction}
              />
            </div>
            <div>
              <TextButton
                label={"Delete complete"}
                status={TextButtonStatus.SECONDARY}
                action={deleteAction}
              />
            </div>
            <div>
              <TextButton
                label={"Logout"}
                status={TextButtonStatus.SECONDARY_PLAIN}
                action={() => {
                  setIsAuthenticated(false);
                  logout();
                }}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
