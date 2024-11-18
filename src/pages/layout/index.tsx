import { TabBar } from "antd-mobile";
import { tabBarConfig } from "./constant";
import { useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AddButton from "../../components/add-button";
export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/topic");
    }
  }, [location.pathname]);
  const handleTabChange = useCallback((path: string) => {
    console.log(path);
    navigate(path, { replace: true });
  }, []);

  return (
    <>
      <Outlet></Outlet>
      <TabBar
        className=" fixed bottom-0 w-screen shadow-sm bg-gray-50"
        onChange={handleTabChange}
        activeKey={location.pathname}
      >
        {tabBarConfig.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
      <AddButton></AddButton>
    </>
  );
}
