import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { checkToken } from "./api/auth";
import UserContext from "./context/UseContext";
import { useEffect, useState } from "react";
import YourPage from "./pages/YourPage";
import Users from "./pages/Users";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(checkToken());
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/yourpage" element={<YourPage />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
