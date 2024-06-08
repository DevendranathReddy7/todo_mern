import styled from "styled-components";

export const SidebarWrapper = styled.div`
  height: 100vh;
  padding-left: 10px;
  width: 20%;
  background-color: ${(props) => (props.active ? "white" : "black")};
  color: ${(props) => (!props.active ? "gray" : "black")};
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
`;

export const TaskItemsWrapper = styled.div`
  border-left: 1.5px dashed;

  margin: 0 10px;
`;

export const Ul = styled.ul`
  list-style-type: none;
`;

export const Li = styled.li`
  margin-bottom: 10px;
  font-family: consolas;
`;
export const ThemeWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  background-color: #a4a4a447;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 30px;
  @media (max-width: 1200px) {
    flex-direction: column;
    border-radius: 10px;
    padding: 10px;
    margin-left: 10px;
    width: 14%;
  }
`;

export const ButtonWrapper = styled.button`
  color: #0096ff;
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  border-radius: 30px;
  width: 7rem;
  height: 2rem;
  border-style: none;
  @media (max-width: 1200px) {
    width: 8rem;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
  }
`;
