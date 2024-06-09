import styled from "styled-components";

export const DashboardWrapper = styled.div`
  min-height: 100vh;
  max-height: auto;
  width: ${(props) => (props.sideBar ? "80rem" : "100%")};
  background-color: ${(props) => (props.theme === "light" ? "white" : "black")};
  color: ${(props) => (props.theme === "light" ? "black" : "white")};
`;

export const Nav = styled.nav``;
export const P = styled.p`
  font-size: 24px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: bold;
`;

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Span = styled.span`
  margin-right: 20px;
  padding-bottom: 15px;
  color: ${(props) => (props.active ? "#3a7ca5" : "")};
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalDiv = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #5f9ea0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 3px;
`;

export const Input = styled.input`
  width: 25rem;
  height: 30px;
  margin: 5px;

  @media (max-width: 460px) {
    width: 15rem;
  }
`;

export const Label = styled.label`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  padding-left: 4px;
  font-size: 18px;
`;

export const PriorityDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const Button = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 3px;
  border-style: ${(props) => (props.add ? "none" : "black")};
  background-color: ${(props) => (props.add ? "#3a7ca5" : "transparent")};
  margin: 4px;
  float: right;
`;

/////////////////////////////////-----ToDo styles----///////////////////////////////

export const TodoWrapper = styled.div`
  margin-left: 3px;
  display: flex;
  flex-wrap: wrap;
`;

export const TodoContainer = styled.div`
  width: 17rem;
  height: 8rem;
  border: ${(props) =>
    props.theme === "light" ? "1px solid black" : "1px solid white"};

  border-radius: 5px;
  padding: 0px 10px;
  margin: 0px 0px 10px 20px;
`;

export const Div1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 2px;
`;

export const Div2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2px;
  text-align: center;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  padding: -10px;
`;

export const Date = styled.div`
  color: black;
  font-size: 16px;
  background-color: lightgrey;
  border-radius: 30px;
  width: ${(props) => (props.status ? "3rem" : "7rem")};
  ${(props) =>
    props.status &&
    `
    background-color: ${
      props.status === "Todo"
        ? "lightcoral"
        : props.status === "inProgress"
        ? "lightblue"
        : "lightgreen"
    };
  `};
  padding: 5px;
  height: 1.2rem;
  border-style: none;
`;
