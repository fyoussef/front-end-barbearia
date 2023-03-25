import * as Toast from "@radix-ui/react-toast";
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { MdErrorOutline } from "react-icons/md";

type ToastComponentProps = {
  title: string;
  message: string;
  onCloseToast: () => void;
  variant: "error" | "success";
};

export function ToastComponent({
  message,
  title,
  onCloseToast,
  variant = "error",
}: ToastComponentProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);

    const time = window.setTimeout(() => {
      setOpen(false);
      onCloseToast();
    }, 6000);

    return () => clearTimeout(time);
  }, []);

  function handleCloseToast() {
    setOpen(false);
    onCloseToast();
  }

  const variants = {
    error: {
      theme: "bg-red-300 text-red-800 border-red-800",
      icon: <MdErrorOutline size={18} />,
    },
    success: {
      theme: "bg-green-300 text-green-800 border-green-800",
      icon: <AiOutlineCheckCircle />,
    },
  };

  return (
    <Toast.Provider>
      <Toast.Root
        className={`${variants[variant].theme} rounded-md p-4 border relative`}
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="font-bold">
          <div className="flex items-center gap-2">
            {variants[variant].icon}
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
