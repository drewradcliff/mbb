import Image from "next/image";
import { getRoster } from "../apis";

export default async function Roster() {
  const data = await getRoster("2086");

  return (
    <div className="flex flex-col mx-4">
      <h1 className="text-3xl py-4">Roster</h1>
      {data.map((athlete) => (
        <div key={athlete.id} className="flex space-x-4 py-2">
          <div className="rounded-full bg-gray-200 size-20 flex items-center justify-center overflow-hidden">
            {athlete.headshot && (
              <Image
                src={athlete.headshot}
                alt={athlete.name}
                width={100}
                height={100}
              />
            )}
          </div>
          <div className="flex flex-col">
            <div className="space-x-2">
              <span className="font-medium">{athlete.name}</span>
              <span className="text-sm text-gray-500">{athlete.number}</span>
            </div>
            <div className="space-x-4">
              <span className="text-sm text-gray-500">
                {athlete.experience}
              </span>
              <span className="text-sm text-gray-500">
                {athlete.birthPlace}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
