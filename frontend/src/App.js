import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import SignIn from "./components/Signup/SignIn";
import SignUp from "./components/Signup/Signup";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [sideBar, setSideBar] = useState(true);
  const [theme, setTheme] = useState("light");
  const [todos, setTodos] = useState([]);

  const sidebarHandle = (value) => {
    setSideBar(value);
  };

  const themeHandler = (value) => {
    setTheme(value);
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <div
                className="App"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Sidebar
                  SidebarStatus={sidebarHandle}
                  mode={themeHandler}
                  todos={todos}
                />
                <Dashboard
                  sideBar={sideBar}
                  theme={theme}
                  onTodoUpdate={setTodos}
                />
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Oops!</h1>
                <p>
                  Sorry, but the page you are looking for seems to have taken a
                  coffee break 🍵.
                </p>
                <p>
                  Meanwhile, you can enjoy exploring our awesome{" "}
                  <a href="/home">homepage</a>!
                </p>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
