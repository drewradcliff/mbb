import Image from "next/image";
import { getSchedule } from "./apis";

export default async function Schedule() {
  const { schedule } = await getSchedule("2086");

  return (
    <div className="mx-4">
      <table className="w-full sm:w-auto sm:mx-auto">
        <tbody>
          {schedule.map(({ id, date, name, logo, winner }) => (
            <tr key={id} className="space-x-4 text-sm">
              <td>{date}</td>
              <td className="flex space-x-2">
                <span>vs</span>
                <Image src={logo} alt={name} width={20} height={20} />
              </td>
              <td>{name}</td>
              <td
                className={
                  winner
                    ? "dark:text-green-400 text-green-600"
                    : "dark:text-red-400 text-red-600"
                }
              >
                {winner ? "W" : "L"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
