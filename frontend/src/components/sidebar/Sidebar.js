import React, { useEffect, useState } from "react";
import {
  SidebarWrapper,
  ThemeWrapper,
  ButtonWrapper,
  HeaderWrapper,
  TaskItemsWrapper,
  Ul,
  Li,
  Div,
} from "./styles";
import { CiLight, CiDark } from "react-icons/ci";
import { LuArrowDownRightSquare, LuArrowUpLeftSquare } from "react-icons/lu";

import { useSelector } from "react-redux";

const Sidebar = ({ SidebarStatus, mode, todos }) => {
  //const todos = useSelector((store) => store.todo);

  const [theme, setTheme] = useState("light");
  const [showSideBar, setShowSideBar] = useState(true);

  useEffect(() => {
    SidebarStatus(showSideBar);
  }, [showSideBar]);

  useEffect(() => {
    mode(theme);
  }, [theme]);

  const inTodo = todos?.filter((todo) => todo.status === "Todo");
  const inProgress = todos?.filter((todo) => todo.status === "Progress");
  const completed = todos?.filter((todo) => todo.status === "Completed");

  return (
    <>
      {showSideBar && (
        <SidebarWrapper active={theme === "light"}>
          <HeaderWrapper>
            <h4>Tasks</h4>
            <h3 onClick={() => setShowSideBar(false)}>
              <LuArrowUpLeftSquare />
            </h3>
          </HeaderWrapper>
          <TaskItemsWrapper active={theme === "light"}>
            <Ul>
              <Li>All Tasks ({todos?.length || 0})</Li>
              <Li>To do ({inTodo?.length || 0})</Li>
              <Li>In Progress ({inProgress?.length || 0})</Li>
              <Li>Completed ({completed?.length || 0})</Li>
            </Ul>
          </TaskItemsWrapper>
          <ThemeWrapper>
            <ButtonWrapper
              onClick={() => setTheme("light")}
              active={theme === "light"}
            >
              <CiLight /> Light
            </ButtonWrapper>
            <ButtonWrapper
              onClick={() => setTheme("dark")}
              active={theme === "dark"}
            >
              <CiDark /> Dark
            </ButtonWrapper>
          </ThemeWrapper>
        </SidebarWrapper>
      )}

      {!showSideBar && (
        <Div active={theme === "light"}>
          <LuArrowDownRightSquare
            size={30}
            onClick={() => setShowSideBar(true)}
          />
        </Div>
      )}
    </>
  );
};
export default Sidebar;
