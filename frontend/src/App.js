import { useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import SignIn from "./components/Signup/SignIn";
import SignUp from "./components/Signup/Signup";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

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
    <Provider store={store}>
      <Router>
        <Routes>
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
                  todosCount={totalTodos}
                />
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
