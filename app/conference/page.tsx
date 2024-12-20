import Image from "next/image";
import { getStandings } from "../apis";

export default async function Conference() {
  const { name, standings } = await getStandings();

  return (
    <div className="flex flex-col mx-4">
      <h1 className="text-3xl py-4">{name}</h1>
      <table>
        <tbody className="divide-y divide-gray-200">
          {standings.map((standing) => (
            <tr key={standing.name} className="py-2 flex justify-between">
              <td className="flex space-x-2 items-center">
                <Image
                  src={standing.logo}
                  width={20}
                  height={20}
                  alt={standing.name}
                />
                <span>{standing.name}</span>
              </td>
              <td>{standing.winLoss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
