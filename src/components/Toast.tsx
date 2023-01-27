import * as Toast from "@radix-ui/react-toast";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { MdErrorOutline } from "react-icons/md";

type ToastComponentProps = {
  title: string;
  message: string;
  resetState: (arg: boolean) => void;
};

export function ToastComponent({
  message,
  title,
  resetState,
}: ToastComponentProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);

    const time = window.setTimeout(() => {
      setOpen(false);
      resetState(false);
    }, 6000);

    return () => clearTimeout(time);
  }, []);

  function handleCloseToast() {
    setOpen(false);
    resetState(false);
  }

  return (
    <Toast.Provider>
      <Toast.Root
        className="bg-red-500 text-black rounded-md p-4 border border-red-800 relative"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="font-bold">
          <div className="flex items-center gap-2">
            <MdErrorOutline size={18} />
            {title}
          </div>
        </Toast.Title>
        <Toast.Description asChild>
          <span>{message}</span>
        </Toast.Description>
        <Toast.Action
          asChild
          altText="Close toast"
          className="absolute right-2 top-3"
        >
          <button onClick={handleCloseToast}>
            <GrClose />
          </button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-96 max-w-full m-0 z-20 outline-none" />
    </Toast.Provider>
  );
}
