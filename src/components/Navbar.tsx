import { NavbarProps, TextButtonStatus } from "../../types";
import { TextButton } from "./TextButton";

export const Navbar = ({ showPopupAction, deleteAction }: NavbarProps) => {
  return (
    <div className="flex justify-between gap-5 items-center w-full py-4 z-10">
      <p className="text-2xl font-serif">Todo App</p>
      <div className="flex flex-wrap justify-end gap-3 items-center">
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
      </div>
    </div>
  );
};
