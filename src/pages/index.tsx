import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies, setCookie } from "nookies";
import { useState } from "react";
import { Datepicker } from "../components/Datepicker";
import { AvatarIcon } from "../components/Icons";
import { ScheduleModal } from "../components/ScheduleModal";
import { api } from "../utils/axios";
import { getClientToken } from "../utils/getClientToken";

type HomeProps = {
  schedules: {
    hour: string;
    barber_id: string;
  }[];
};

export default function Home({ schedules }: HomeProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleSelectedDate(selectedDate: Date) {
    setSelectedDate(selectedDate);
  }

  return (
    <div>
      <Head>
        <title>Agenda</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/mustache_16.png" />
      </Head>

      <div className="flex flex-col items-center mt-8">
        <Datepicker handleSelectedDate={handleSelectedDate} />

        <div className="w-[546px] p-4 bg-white border rounded-lg shadow-md sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 ">
              Agenda do dia {format(selectedDate, "dd/MM/yyyy")}
            </h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 ">
              {schedules.map((schedule) => (
                <ScheduleModal
                  key={schedule.hour}
                  title={`Agenda para ${schedule.hour}`}
                  scheduleDate={selectedDate}
                  scheduleHour={schedule.hour}
                >
                  <li className="py-3 sm:py-4 cursor-pointer hover:bg-slate-200 p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <AvatarIcon />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate ">
                          Horário Livre
                        </p>
                        <p className="text-sm text-gray-500 truncate ">
                          {/* email@windster.com */}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                        {schedule.hour}
                      </div>
                    </div>
                  </li>
                </ScheduleModal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getClientToken(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  api.defaults.headers["Authorization"] = `Bearer ${
    parseCookies(ctx).user_token
  }`;

  try {
    const req = await api.get("/schedules");

    const { schedules } = req.data;

    return {
      props: {
        schedules,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
