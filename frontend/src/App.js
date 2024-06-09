import { useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const [sideBar, setSideBar] = useState(true);
  const [theme, setTheme] = useState("light");
  const [todos, setTodos] = useState([]);

  const totalTodos = (value) => {
    setTodos(value);
  };
  const sidebarHandle = (value) => {
    setSideBar(value);
  };

  const themeHandler = (value) => {
    setTheme(value);
  };

  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar
        SidebarStatus={sidebarHandle}
        mode={themeHandler}
        todos={todos}
      />
      <Dashboard sideBar={sideBar} theme={theme} todosCount={totalTodos} />
    </div>
  );
}

export default App;
