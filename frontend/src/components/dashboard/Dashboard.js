import React, { useEffect, useState } from "react";
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
import Todo from "./Todo";

const getDate = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day}-${months[month]}-${year}`;
};
const intialTodo = {
  id: "",
  title: "",
  description: "",
  priority: "",
  status: "Todo",
  date: getDate(),
};
const Dashboard = ({ sideBar, theme, todosCount }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [activeIcon, setActiveIcon] = useState("board view");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(intialTodo);

  const addItemHandler = () => {
    setActiveIcon("add item");
    setShowModal(true);
  };

  const addPriorityHandle = () => {
    setShowPriority(true);
  };

  const handlePriority = (e) => {
    setShowPriority(false);
    const priority = e.target.getAttribute("priority");
    setCurrentTodo((prev) => ({
      ...prev,
      priority: priority,
      id: Math.random().toString(36),
    }));
  };
  const filterHandler = () => {
    setActiveIcon("filter");
  };
  const todoHandle = (e, field) => {
    const value = e.target.value;
    setCurrentTodo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    todosCount(todos);
  }, [todos]);

  const editTodoHandler = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;

    const id = currentTodo[0].id;
    const temptodo = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            title: title,
            priority: priority,
            description: description,
            date: getDate(),
          }
        : todo
    );
    setTodos(temptodo);
    setCurrentTodo(intialTodo);
    setShowModal(false);
    setIsEditing(false);
  };

  const addHandler = () => {
    setShowModal(false);
    setActiveIcon("board view");
    setTodos((prevTodos) => [...prevTodos, currentTodo]);
    setCurrentTodo(intialTodo);
  };

  const deleteHandler = (id) => {
    const tempTodo = todos.filter((todo) => todo.id !== id);
    setTodos(tempTodo);
  };

  const editHandler = (id) => {
    const tempTodo = todos.filter((todo) => todo.id === id);
    setCurrentTodo(tempTodo);
    setIsEditing(true);
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      const titleInput = document.getElementById("title");
      if (titleInput) {
        titleInput.value = currentTodo[0]?.title || "";
      }
      const descriptionInput = document.getElementById("description");
      if (descriptionInput) {
        descriptionInput.value = currentTodo[0]?.description || "";
      }

      const priorityInput = document.getElementById("priority");
      if (priorityInput) {
        priorityInput.value = currentTodo[0]?.priority || "";
      }
    }
  }, [showModal]);

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
          <Input
            id="title"
            onChange={(e) => todoHandle(e, "title")}
            value={currentTodo.title}
          />
          <Label>Description</Label>
          <Input
            id="description"
            onChange={(e) => todoHandle(e, "description")}
          />
          <Label>Priority</Label>
          <Input
            id="priority"
            onClick={addPriorityHandle}
            value={currentTodo?.priority}
          ></Input>
          {showPriority && priorityModal()}
          <div>
            {isEditing ? (
              <Button onClick={editTodoHandler} add>
                Save
              </Button>
            ) : (
              <Button onClick={addHandler} add>
                Add
              </Button>
            )}
            <Button
              onClick={() => {
                setShowModal(false);
                setActiveIcon("board view");
                setIsEditing(false);
              }}
            >
              Close
            </Button>
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
          <Span active={activeIcon === "board view"}>
            <RxDashboard /> Board View
          </Span>
          <Span onClick={addItemHandler} active={activeIcon === "add item"}>
            <RxCardStackPlus /> Add Item
          </Span>
        </div>
        <div>
          <Span onClick={filterHandler} active={activeIcon === "filter"}>
            <LuFilterX /> Filter
          </Span>
        </div>
      </Div>
      <hr />
      <Todo
        todos={todos}
        theme={theme}
        deleteTodo={deleteHandler}
        editTodo={editHandler}
      />
      {showModal && displayModal()}
    </DashboardWrapper>
  );
};
export default Dashboard;
