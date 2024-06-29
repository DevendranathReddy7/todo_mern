import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Div, Login, P, Span } from "./styles";
import { RxCardStackPlus, RxDashboard } from "react-icons/rx";
import { LuFilterX } from "react-icons/lu";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Navbar = ({ activeIcon, addItemHandler, filterHandler }) => {
  const user = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.currentUser === "") {
      let msg = (
        <p>
          You are not authorized to perform any action. Please{" "}
          <a href="/signin" target="_blank">
            sign-in
          </a>{" "}
          or{" "}
          <a href="/signup" target="_blank">
            sign-up
          </a>{" "}
          to proceed.
        </p>
      );
      toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }, []);

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: "20px",
        }}
      >
        <>
          <P>Welcome back, {user.name.split(" ")[0] || "Guest"}👋</P>
        </>
        <>
          <Login onClick={() => navigate("/signin")}>
            {user.currentUser ? "Log-out" : "Log-in"}
          </Login>
        </>
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
    </>
  );
};
export default Navbar;
