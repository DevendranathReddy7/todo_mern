import React, { useState } from "react";
import { TodoWrapper, TodoContainer, Div1, Div2, Title, Date } from "./styles";
import { TiDeleteOutline } from "react-icons/ti";
import { RiEditCircleLine } from "react-icons/ri";

import { SlCalender } from "react-icons/sl";
import { toast } from "react-toastify";

import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
//import { Delete, edit } from "../../store/actions/todoActions";

const Todo = ({
  theme,
  filter,
  todosChanged,
  todos,
  editingStatus,
  modalStatus,
  currentTODO,
}) => {
  //const dispatch = useDispatch();
  //const todos = useSelector((store) => store.todo);
  const user = useSelector((store) => store.auth);

  const editHandler = (id) => {
    const tempTodo = todos.filter((todo) => todo.id === id);
    currentTODO(tempTodo);
    modalStatus(true);
    editingStatus(true);
  };

  const deleteHandler = async (id) => {
    const response = await fetch("https://todo-9wex.onrender.com/todo/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, owner: user.currentUser }),
    });

    const data = await response.json();
    if (response.ok) {
      todosChanged();
      toast.success("Todo has been successfully deleted!", {
        position: "top-right",
        autoClose: 2000,
      });
      //dispatch(Delete(id));
    } else {
      toast.error("Failed to delete Todo, please try again!", {
        position: "top-right",
        autoClose: 2000,
      });
      //setError((prev) => ({ ...prev, error: true, msg: data.message }));
    }
  };

  const getDate = (date) => {
    let dateStr = date.split("T")[0];
    let [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <TodoWrapper>
      {todos?.map(
        (todo) =>
          filter[todo?.status] && (
            <TodoContainer theme={theme} key={todo._id}>
              <Div1>
                <div>
                  <Title>
                    {todo.title.length < 13
                      ? todo.title
                      : todo.title.slice(0, 12) + "..."}
                  </Title>
                  <p>
                    {todo.description.length < 20
                      ? todo.description
                      : todo.description.slice(0, 19) + "..."}
                  </p>
                </div>

                <div>
                  <div
                    style={{ paddingTop: "15px" }}
                    onClick={() => editHandler(todo._id)}
                  >
                    <RiEditCircleLine size={23} />
                  </div>
                  <div onClick={() => deleteHandler(todo._id)}>
                    <TiDeleteOutline size={25} />
                  </div>
                </div>
              </Div1>
              <Div2>
                <Date>
                  <SlCalender />
                  {getDate(todo.date)}
                </Date>

                <div>
                  {todo.priority === "High" ? (
                    <FcHighPriority />
                  ) : todo.priority === "Medium" ? (
                    <FcMediumPriority />
                  ) : (
                    <FcLowPriority />
                  )}{" "}
                  {todo.priority}
                </div>

                <Date status={todo.status}>{todo.status}</Date>
              </Div2>
            </TodoContainer>
          )
      )}
    </TodoWrapper>
  );
};
export default Todo;

{
  /* <TodoContainer theme={theme}>
          <Div1>
            <div>
              <Title>
                {todo.title.length < 13
                  ? todo.title
                  : todo.title.slice(0, 12) + "..."}
              </Title>
              <p>
                {todo.description.length < 20
                  ? todo.description
                  : todo.description.slice(0, 19) + "..."}
              </p>
            </div>

            <div>
              <div
                style={{ paddingTop: "15px" }}
                onClick={() => editHandler(todo.id)}
              >
                <RiEditCircleLine size={23} />
              </div>
              <div onClick={() => deleteHandler(todo.id)}>
                <TiDeleteOutline size={25} />
              </div>
            </div>
          </Div1>
          <Div2>
            <Date>
              <SlCalender /> {todo.date}
            </Date>

            <div>
              {todo.priority === "High" ? (
                <FcHighPriority />
              ) : todo.priority === "Medium" ? (
                <FcMediumPriority />
              ) : (
                <FcLowPriority />
              )}{" "}
              {todo.priority}
            </div>

            <Date status={todo.status}>{todo.status}</Date>
          </Div2>
        </TodoContainer> */
}
