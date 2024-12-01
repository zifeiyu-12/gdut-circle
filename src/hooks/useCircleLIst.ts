import { useRequest } from "ahooks";
import { getCircleList } from "../api/circle";

export const useCircleList = () => {
  return useRequest(
    async (page: number, size: number) => {
      return await getCircleList({
        page,
        size,
      });
    },
    {
      manual: true,
    }
  );
};
