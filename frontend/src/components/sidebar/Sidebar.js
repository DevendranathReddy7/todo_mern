import React, { useState } from "react";
import {
  SidebarWrapper,
  ThemeWrapper,
  ButtonWrapper,
  HeaderWrapper,
  TaskItemsWrapper,
  Ul,
  Li,
} from "./styles";
import { CiLight, CiDark } from "react-icons/ci";
import { LuArrowDownRightSquare } from "react-icons/lu";

const Sidebar = (props) => {
  const [theme, setTheme] = useState("light");
  const [showSideBar, setShowSideBar] = useState(true);
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
        <LuArrowDownRightSquare
          size={30}
          onClick={() => setShowSideBar(true)}
        />
      )}
    </>
  );
};
export default Sidebar;
