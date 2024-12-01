import { AddOutline } from "antd-mobile-icons";
import { Button } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FloatingBubble } from "antd-mobile";
export default function AddButton() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <FloatingBubble
      axis="xy"
      style={{
        "--initial-position-bottom": "20px",
        "--initial-position-right": `${window.innerWidth / 2 - 24}px`,
      }}
    >
      <Button
        icon={<AddOutline></AddOutline>}
        type="primary"
        shape="circle"
        size="large"
        onClick={() => {
          let path = "/create-topic";
          if (searchParams.get("circleId")) {
            path += "?circleId=" + searchParams.get("circleId");
          }
          navigate(path);
        }}
      ></Button>
    </FloatingBubble>
  );
}
