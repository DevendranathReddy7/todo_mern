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
import { LuArrowDownRightSquare } from "react-icons/lu";

const Sidebar = ({ SidebarStatus, mode }) => {
  const [theme, setTheme] = useState("light");
  const [showSideBar, setShowSideBar] = useState(true);

  useEffect(() => {
    SidebarStatus(showSideBar);
  }, [showSideBar]);

  useEffect(() => {
    mode(theme);
  }, [theme]);

  return (
    <>
      {showSideBar ? (
        <SidebarWrapper active={theme === "light"}>
          <HeaderWrapper>
            <h4>Tasks</h4>
            <h3 onClick={() => setShowSideBar(false)}>&times;</h3>
          </HeaderWrapper>
          <TaskItemsWrapper active={theme === "light"}>
            <Ul>
              <Li>All Tasks (0)</Li>
              <Li>To do (0)</Li>
              <Li>In Progress (0)</Li>
              <Li>Completed (0)</Li>
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
      ) : (
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
