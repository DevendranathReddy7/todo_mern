import React from "react";
import { TodoWrapper, TodoContainer, Div1, Div2, Title, Date } from "./styles";
import { TiDeleteOutline } from "react-icons/ti";
import { RiEditCircleLine } from "react-icons/ri";

import { SlCalender } from "react-icons/sl";

import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
const Todo = ({ todos, theme, deleteTodo, editTodo }) => {
  const deleteHandler = (id) => {
    deleteTodo(id);
  };

  const editHandler = (id) => {
    editTodo(id);
  };

  return (
    <TodoWrapper>
      {todos.map((todo) => (
        <TodoContainer theme={theme}>
          <Div1>
            <div>
              <Title>{todo.title}</Title>
              <p>{todo.description}</p>
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
        </TodoContainer>
      ))}
    </TodoWrapper>
  );
};
export default Todo;
