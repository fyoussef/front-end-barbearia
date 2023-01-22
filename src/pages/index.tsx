import axios from "axios";
import { format } from "date-fns";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { Datepicker } from "../components/Datepicker";
import { AvatarIcon } from "../components/Icons";

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

        <div className="w-[546px] p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Agenda do dia {format(selectedDate, "dd/MM/yyyy")}
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {schedules.map((schedule) => (
                <li className="py-3 sm:py-4 cursor-pointer" key={schedule.hour}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <AvatarIcon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Horário Livre
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {/* email@windster.com */}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {schedule.hour}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  /* const barber_id = "e32ef709-739a-4537-9f7f-3921e3f63900";

  const res = await axios.get("http://localhost:5000/schedules/" + barber_id);
  const { schedules } = res.data; */

  return {
    props: { schedules: [] },
  };
};
