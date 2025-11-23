import React, { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

const Navbar = ({ logged, setLogged }) => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <nav className="w-full sticky top-0 flex justify-around p-2 bg-gray-200">
        {/* brand logo name */}
        <div className="font-bold text-lg">
          <span className="bg-green-500 px-1">in</span>
          <span>
            {" "}
            <span className="text-green-600">INVENT</span>ory
          </span>
        </div>

        {/* dark mode button */}
        <div>
          <button
            onClick={() => toggleDarkMode()}
            className={`rounded-xl py-0.5 px-2 font-medium border cursor-pointer ${darkMode ? `bg-white text-gray-700` : `bg-slate-700 text-white`}`}
          >
            {darkMode ? `Lights ON` : `Lights OFF`}
          </button>
        </div>

        {/* Login button */}
        <div>
          {!logged ? (
            <button
              onClick={() => navigate("login")}
              className="border border-green-400 rounded-xl pb-0.5 px-1.5 font-medium cursor-pointer hover:bg-green-400 hover:text-white"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => setLogged(false)}
              className="border-2 border-red-700 bg-red-500 text-white rounded-xl pb-0.5 px-1.5 font-medium cursor-pointer hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default memo(Navbar);
