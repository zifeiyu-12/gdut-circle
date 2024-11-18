import { AddOutline } from "antd-mobile-icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FloatingBubble } from "antd-mobile";
export default function AddButton() {
  const navigate = useNavigate();
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
          navigate("/create-topic");
        }}
      ></Button>
    </FloatingBubble>
  );
}
