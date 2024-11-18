import { FC } from "react";
import { Circles } from "../../types/circle";

export const CirclePreview: FC<Circles> = ({ name, description }) => {
  const cover = "";
  return (
    <>
      {cover && (
        <div className="relative">
          <img
            className="w-screen h-40 object-cover rounded-md"
            src={cover ?? ""}
          />
          <div className="h-full w-full absolute left-0 top-0 flex justify-end items-end text-white p-3">
            <div className="text-right">
              <div className="text-2xl  font-bold">{name}</div>
              <div className="text-gray-200 text-sm">{description}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
