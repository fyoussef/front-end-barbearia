import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import {
  BeardAndHairIcon,
  BeardIcon,
  CurlingIronIcon,
  HairCutIcon,
  HairHydratationIcon,
  HairPaintIcon,
  Relachamento,
} from "./Icons";

type ScheduleModal = {
  children: JSX.Element;
  title: string;
};

export function ScheduleModal({ children, title }: ScheduleModal) {
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

  return (
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
              />
              <input
                type="text"
                className="p-2 w-full border border-slate-300 rounded-md"
                placeholder="Telefone"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {services.map((service) => (
                <button className="border border-slate-400 p-2 rounded-md flex flex-col items-center justify-center gap-y-4 hover:bg-gray-200">
                  {service.icon}
                  <small className="font-medium">{service.service}</small>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4">
              <Dialog.Close asChild>
                <button className="bg-red-600 hover:bg-red-700 transition ease-in-out delay-75 px-4 py-2 rounded-md border text-white font-semibold">
                  Cancelar
                </button>
              </Dialog.Close>
              <button className="bg-emerald-600 hover:bg-emerald-700 transition ease-in-out delay-75 px-4 py-2 rounded-md text-white font-semibold">
                Agendar
              </button>
            </div>
          </div>

          <Dialog.Close asChild>
            <AiOutlineClose
              className="absolute top-4 right-4 cursor-pointer"
              size={20}
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
