import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { createChat } from "../../api/user";
import { useWebSocket } from "ahooks";
import { WS_URL } from "../../utils/http";

export const Chat = () => {
  const [serchParam, setSearchParam] = useSearchParams();
  const toUserId = serchParam.get("toUserId");

  const { data, sendMessage, connect, readyState } = useWebSocket(
    WS_URL + localStorage.getItem("token") ?? "",
    {
      manual: true,
      onError: (e) => {
        console.log(e);
      },
      onClose(e) {
        console.log("close", e);
      },
    }
  );
  useEffect(() => {
    if (toUserId) {
      createChat(toUserId).then(({ success }) => {
        if (success) {
          connect();
          console.log(readyState);
        }
      });
    }
  }, [toUserId]);
  return <>Chat</>;
};
