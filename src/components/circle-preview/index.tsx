import { FC } from "react";
import { Circles } from "../../types/circle";
import { Empty } from "antd";

export const CirclePreview: FC<Circles> = (props) => {
  const { name, description, profile } = props;
  return (
    <>
      {profile ? (
        <div className="relative">
          <img
            className="w-screen h-40 object-cover rounded-md"
            src={profile ?? ""}
          />
          <div className="h-full w-full absolute left-0 top-0 flex justify-end items-end text-white p-3">
            <div className="text-right">
              <div className="text-2xl  font-bold">{name}</div>
              <div className="text-gray-200 text-sm">{description}</div>
            </div>
          </div>
        </div>
      ) : (
        <Empty description="作者很懒，什么都没留下"></Empty>
      )}
    </>
  );
};
