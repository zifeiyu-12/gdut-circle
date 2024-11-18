import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#98f74c",
        },
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <Router></Router>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
