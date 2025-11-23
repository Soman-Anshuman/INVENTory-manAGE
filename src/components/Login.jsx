import React, { useContext } from "react";
import { logCreds } from "../utilities/login-creds";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

function Login({ setLogged }) {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    if (
      formData.get("username") !== logCreds.username ||
      formData.get("password") !== logCreds.password
    ) {
      alert("Wrong Username or Password");
      return;
    }

    setLogged(true);
    navigate(-1);
  }

  return (
    <>
      <div
        className={`h-[100vh] flex justify-center ${
          darkMode ? `bg-slate-900` : ``
        }`}
      >
        <form
          onSubmit={handleLogin}
          className={`p-4 shadow-lg rounded-lg flex flex-col gap-3 self-center ${
            darkMode ? `bg-slate-800` : `bg-gray-200`
          }`}
        >
          <h2 className="text-xl text-red-600">Login</h2>

          <p className={darkMode ? `text-white` : ``}>
            Username:{" "}
            <input
              type="text"
              name="username"
              placeholder="Fill username here..."
              className={`p-1.5 rounded-2xl ${
                darkMode ? `bg-slate-500` : `bg-white`
              }`}
            />
          </p>
          <p className={darkMode ? `text-white` : ``}>
            Password:{" "}
            <input
              type="password"
              name="password"
              placeholder="Fill password here..."
              className={`p-1.5 rounded-2xl ${
                darkMode ? `bg-slate-500` : `bg-white`
              }`}
            />
          </p>

          <div className="flex justify-evenly">
            <button
              type="submit"
              className="py-1 px-3 rounded-lg bg-amber-400 text-white cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              className="py-1 px-3 rounded-lg bg-red-400 text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
