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
  Checkbox,
  CheckboxDiv,
  Login,
  Date1,
} from "./styles";
import { RxDashboard, RxCardStackPlus } from "react-icons/rx";

import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";

import { LuFilterX } from "react-icons/lu";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { add, edit, Delete } from "../../store/actions/todoActions";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

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
const Dashboard = ({ sideBar, theme, onTodoUpdate }) => {
  const user = useSelector((store) => store.auth);
  const todosStore = useSelector((store) => store.todo);
  const [showModal, setShowModal] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [activeIcon, setActiveIcon] = useState("board view");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(intialTodo);
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Todo");
  const [error, setError] = useState(false);
  const [todosChanged, setTodosChanged] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    Todo: true,
    Progress: true,
    Completed: true,
  });

  //get Todos
  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch(
        `http://localhost:5000/todo/${user.currentUser}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      setTodos(data.todos);
      onTodoUpdate(data.todos);
    };
    getTodos();
  }, [user.currentUser, todosStore, todosChanged]);

  const getTodoagainHandler = () => {
    setTodosChanged(!todosChanged);
  };
  const addItemHandler = () => {
    setActiveIcon("add item");
    setIsFilterClicked(false);
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
    }));
    setError(false);
  };

  const filterHandler = () => {
    setActiveIcon("filter");
    setIsFilterClicked((prev) => !prev);
  };
  const todoHandle = (e, field) => {
    const value = e.target.value;
    setCurrentTodo((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(false);
  };

  const addHandler = async () => {
    if (
      currentTodo.title === "" ||
      currentTodo.description === "" ||
      currentTodo.priority === ""
    ) {
      setError(true);
    } else {
      const response = await fetch("http://localhost:5000/todo/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentTodo, owner: user.currentUser }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(add(data));
      } else {
        setError((prev) => ({ ...prev, error: true, msg: data.message }));
      }
      setShowModal(false);
      setError(false);
      setActiveIcon("board view");
      setCurrentTodo(intialTodo);
    }
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

  const filterTodoHandler = (e) => {
    const checkBox = e.target.getAttribute("filterValue");
    switch (checkBox) {
      case "todo":
        setFilter((prev) => ({ ...prev, Todo: !filter.Todo }));
        break;
      case "progress":
        setFilter((prev) => ({ ...prev, Progress: !filter.Progress }));
        break;
      case "completed":
        setFilter((prev) => ({ ...prev, Completed: !filter.Completed }));
        break;
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

  const editTodoHandler = async () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;

    const response = await fetch("http://localhost:5000/todo/edit", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        priority: priority,
        status: currentStatus,
        owner: user.currentUser,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      //dispatch(edit(currentTodo));
      setTodosChanged(!todosChanged);
    } else {
      //setError((prev) => ({ ...prev, error: true, msg: data.message }));
    }

    setCurrentTodo(intialTodo);
    setShowModal(false);
    setIsEditing(false);
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
            autoComplete="off"
          />
          <Label>Description</Label>
          <Input
            id="description"
            onChange={(e) => todoHandle(e, "description")}
            autoComplete="off"
          />
          <Label>Priority</Label>
          <Input
            id="priority"
            onClick={addPriorityHandle}
            value={currentTodo?.priority}
            autoComplete="off"
          ></Input>
          {showPriority && priorityModal()}
          {isEditing && displayStatus()}
          {error && (
            <p
              style={{
                color: "red",
                backgroundColor: "black",
                fontSize: "20px",
                padding: "5px",
              }}
            >
              All fields are mandatory
            </p>
          )}
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
            {!isEditing && (
              <Button
                onClick={() => {
                  setShowModal(false);
                  setActiveIcon("board view");
                  setIsEditing(false);
                }}
              >
                Close
              </Button>
            )}
          </div>
        </ModalDiv>
      </Overlay>
    );
  };

  const updateStatus = (value) => {
    setCurrentStatus(value);
  };

  const displayStatus = () => {
    return (
      <>
        <Date1 status={"Todo"} onClick={() => updateStatus("Todo")}>
          Todo
        </Date1>

        <Date1 status="Progress" onClick={() => updateStatus("Progress")}>
          Progress
        </Date1>

        <Date1 status="Completed" onClick={() => updateStatus("Completed")}>
          Completed
        </Date1>
      </>
    );
  };

  const displayFilter = () => {
    return (
      <CheckboxDiv theme={theme} onClick={(e) => filterTodoHandler(e)}>
        <div>
          <Checkbox type="checkbox" filterValue="todo" checked={filter.Todo} />
          <label> Todo</label>
        </div>
        <div>
          <Checkbox
            type="checkbox"
            filterValue="progress"
            checked={filter.Progress}
          />
          <label> In-Progress</label>
        </div>
        <div>
          <Checkbox
            type="checkbox"
            filterValue="completed"
            checked={filter.Completed}
          />
          <label> Completed</label>
        </div>
      </CheckboxDiv>
    );
  };

  return (
    <DashboardWrapper sideBar={sideBar} theme={theme}>
      <Navbar
        activeIcon={activeIcon}
        addItemHandler={addItemHandler}
        filterHandler={filterHandler}
      />

      <Todo
        todos={todos}
        theme={theme}
        filter={filter}
        todosChanged={getTodoagainHandler}
        modalStatus={setShowModal}
        editingStatus={setIsEditing}
        currentTODO={setCurrentTodo}
      />
      {changeStatus && displayStatus()}
      {showModal && displayModal()}
      {isFilterClicked && displayFilter()}
    </DashboardWrapper>
  );
};
export default Dashboard;
