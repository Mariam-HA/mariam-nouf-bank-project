import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { register } from "../api/auth";
import UserContext from "../context/UseContext";

const Register = () => {
  const [userInfo, setUserInfo] = useState({});

  const [user, setUser] = useContext(UserContext);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const { mutate: registerFun } = useMutation({
    mutationFn: () => register(userInfo),
    onSuccess: (data) => {
      if (data.access) {
        setUser(true);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerFun();
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-10"
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
            className="block text-gray-700 text-sm font-medium mb-2 text"
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

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Profile Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
