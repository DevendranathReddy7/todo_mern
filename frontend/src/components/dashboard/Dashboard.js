import React, { useState } from "react";
import {
  DashboardWrapper,
  P,
  Div,
  Span,
  ModalDiv,
  Overlay,
  Input,
  Label,
  PriorityDiv,
  Button,
} from "./styles";
import { RxDashboard, RxCardStackPlus } from "react-icons/rx";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";

import { LuFilterX } from "react-icons/lu";

const Dashboard = ({ sideBar, theme }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    priority: "",
  });
  const addItemHandler = () => {
    setShowModal(true);
  };

  const addPriorityHandle = () => {
    setShowPriority(true);
  };

  const handlePriority = (e) => {
    setShowPriority(false);
    setTodo((prev) => ({
      ...prev,
      priority: e.target.getAttribute("priority"),
    }));
  };

  const todoHandle = (e, field) => {
    switch (field) {
      case "title":
        setTodo((prev) => ({
          ...prev,
          title: e.target.value,
        }));
        break;
      case "description":
        setTodo((prev) => ({
          ...prev,
          description: e.target.value,
        }));
        break;
      default:
        setTodo((prev) => ({
          ...prev,
        }));
    }
  };
  const priorityModal = () => {
    return (
      <PriorityDiv onClick={(e) => handlePriority(e)}>
        <Span priority="High">
          <FcHighPriority /> High
        </Span>
        <Span priority="Medium">
          <FcMediumPriority /> Medium
        </Span>
        <Span priority="Low">
          <FcLowPriority /> Low
        </Span>
      </PriorityDiv>
    );
  };
  const displayModal = () => {
    return (
      <Overlay>
        <ModalDiv>
          <Label>Todo</Label>
          <Input onChange={(e) => todoHandle(e, "title")} />
          <Label>Description</Label>
          <Input onChange={(e) => todoHandle(e, "description")} />
          <Label>Priority</Label>
          <Input onClick={addPriorityHandle} value={todo.priority}></Input>
          {showPriority && priorityModal()}
          <div>
            <Button onClick={() => setShowModal(false)} add>
              Add
            </Button>
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </div>
        </ModalDiv>
      </Overlay>
    );
  };
  return (
    <DashboardWrapper sideBar={sideBar} theme={theme}>
      <nav>
        <P>Welcome back, Dev👋</P>
      </nav>

      <Div>
        <div>
          <Span>
            <RxDashboard /> Board View
          </Span>
          <Span onClick={addItemHandler}>
            <RxCardStackPlus /> Add Item
          </Span>
        </div>
        <div>
          <Span>
            <LuFilterX /> Filter
          </Span>
        </div>
      </Div>
      <hr />
      {showModal && displayModal()}
    </DashboardWrapper>
  );
};
export default Dashboard;
