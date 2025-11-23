import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import { useState } from "react";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  const [logged, setLogged] = useState(false);

  return (
      <DarkModeProvider>
      <div className="">
        <Routes>
          <Route
            path="/"
            element={<>
                  <Navbar logged={logged} setLogged={setLogged} />
                  <Home logged={logged} />
            </>}
          />
          <Route
            path="login"
            element={
                <Login setLogged={setLogged} />
              }
              />
        </Routes>
      </div>
      </DarkModeProvider>
  );
}

export default App;
