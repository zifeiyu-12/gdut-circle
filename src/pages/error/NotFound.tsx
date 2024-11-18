import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      跑偏了~~~，点击回到
      <Link to="/" className="text-blue-600 underline active:text-blue-800">
        首页
      </Link>
    </div>
  );
}
