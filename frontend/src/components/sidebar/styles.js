import styled from "styled-components";

export const SidebarWrapper = styled.div`
  min-height: 100vh;
  max-height: auto;
  padding-left: 10px;
  width: 25rem;
  background-color: ${(props) => (props.active ? "white" : "black")};
  color: ${(props) => (!props.active ? "white" : "black")};
  @media (max-width: 594px) {
    display: none;
  }
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
`;
export const ThemeWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  left: 20px;
  background-color: #a4a4a447;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 30px;
  @media (max-width: 1040px) {
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
  @media (max-width: 1040px) {
    width: 8rem;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
  }
`;

export const Div = styled.div`
  background-color: ${(props) => (props.active ? "white" : "black")};
  color: ${(props) => (!props.active ? "white" : "black")};
  @media (max-width: 594px) {
    display: block;
  }
`;
