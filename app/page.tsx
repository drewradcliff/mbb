import Image from "next/image";
import { getSchedule } from "./apis";

export default async function Schedule() {
  const { schedule, name, logo, record, standing } = await getSchedule("2086");

  return (
    <div className="flex flex-col mx-4">
      <div className="flex py-4 space-x-2">
        <Image src={logo} alt={name + " logo"} width={50} height={50} />
        <div>
          <h1 className="text-2xl">{name}</h1>
          <span className="text-sm text-gray-500">
            ({record}) {standing}
          </span>
        </div>
      </div>
      <table>
        <tbody className="divide-y divide-gray-200">
          {schedule.map(
            ({ id, date, time, name, logo, winner, score, homeAway }) => (
              <tr key={id} className="space-x-4 text-sm">
                <td>{date}</td>
                <td className="flex space-x-2">
                  <span>{homeAway}</span>
                  <Image src={logo} alt={name} width={20} height={20} />
                </td>
                <td>{name}</td>
                <td>{score !== undefined ? score : time}</td>
                <td
                  className={
                    winner
                      ? "dark:text-green-400 text-green-600"
                      : "dark:text-red-400 text-red-600"
                  }
                >
                  {winner === undefined ? "" : winner ? "W" : "L"}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
