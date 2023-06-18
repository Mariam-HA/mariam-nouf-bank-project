import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../api/auth";
import UserContext from "../context/UseContext";

const Login = () => {
  const [userInfo, setUserInfo] = useState({});

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [user, setUser] = useContext(UserContext);

  const [error, setError] = useState("");

  const { mutate: loginFun } = useMutation({
    mutationFn: () => login(userInfo),
    onSuccess: (data) => {
      if (data.access) {
        setUser(true);
      } else {
        setError(data);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginFun();
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-slate-50 ">
        <form
          className="bg-white rounded-lg shadow-md p-10 w-[400px] h-[350px]"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              UserName
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex justify-center mt-16 ">
            {error && <p className="text-red-500">{error.message}</p>}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
