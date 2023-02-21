import * as Dialog from "@radix-ui/react-dialog";
import { add, format, parse, parseISO } from "date-fns";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { api } from "../utils/axios";
import {
  BeardAndHairIcon,
  BeardIcon,
  CurlingIronIcon,
  HairCutIcon,
  HairHydratationIcon,
  HairPaintIcon,
  Relachamento,
} from "./Icons";
import { ToastComponent } from "./Toast";

type ScheduleModal = {
  children: JSX.Element;
  title: string;
  scheduleDate: Date;
  scheduleHour: string;
};

export function ScheduleModal({
  children,
  title,
  scheduleDate,
  scheduleHour,
}: ScheduleModal) {
  const services = [
    {
      icon: <HairCutIcon />,
      service: "Cabelo",
    },
    {
      icon: <BeardIcon />,
      service: "Barba",
    },
    {
      icon: <BeardAndHairIcon />,
      service: "Cabelo e Barba",
    },
    {
      icon: <CurlingIronIcon />,
      service: "Progressiva",
    },
    {
      icon: <Relachamento />,
      service: "Relachamento",
    },
    {
      icon: <HairPaintIcon />,
      service: "Tonalizante",
    },
    {
      icon: <HairHydratationIcon />,
      service: "Hidratação",
    },
  ];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const barber_id = "";

  async function handleClientScheule() {
    /* { name, phone, scheduledAt, barber_id } */

    const [hour, min] = scheduleHour.split(":");

    const scheduledAt = add(parseISO(format(scheduleDate, "yyyy-MM-dd")), {
      hours: Number(hour),
      minutes: Number(min),
    });

    if (!name && !phone) {
      console.log("erro");
    }

    try {
      const req = await api.post("/schedule_client", {
        name,
        phone,
        scheduledAt,
        user_token: parseCookies().user_token,
      });

      const { data } = req;

      console.log("data", data);
    } catch (error: any) {
      const data = error.response.data;
      const message = data.error;
      setShowToast(true);
      setErrorMessage(message);
    }
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed bg-black/50 inset-0" />
          <Dialog.Content className="fixed bg-white p-8 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] outline-none w-[600px] rounded-md border-gray-500">
            <Dialog.Title>{title}</Dialog.Title>

            <div className="flex flex-col space-y-8">
              <div className="mt-4 flex items-center gap-4">
                <input
                  type="text"
                  className="p-2 w-full border border-slate-300 rounded-md"
                  placeholder="Nome"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="p-2 w-full border border-slate-300 rounded-md"
                  placeholder="Telefone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                {services.map(({ icon, service }) => (
                  <button
                    key={service}
                    className="border border-slate-400 p-2 rounded-md flex flex-col items-center justify-center gap-y-4 hover:bg-gray-200"
                  >
                    {icon}
                    <small className="font-medium">{service}</small>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-end gap-4">
                <Dialog.Close asChild>
                  <button className="bg-red-600 hover:bg-red-700 transition ease-in-out delay-75 px-4 py-2 rounded-md border text-white font-semibold">
                    Cancelar
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleClientScheule}
                  className="bg-emerald-600 hover:bg-emerald-700 transition ease-in-out delay-75 px-4 py-2 rounded-md text-white font-semibold"
                >
                  Agendar
                </button>
              </div>
            </div>

            <Dialog.Close>
              <AiOutlineClose
                className="absolute top-4 right-4 cursor-pointer"
                size={20}
              />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {showToast && (
        <ToastComponent
          message={errorMessage}
          title="Erro"
          resetState={setShowToast}
        />
      )}
    </>
  );
}
