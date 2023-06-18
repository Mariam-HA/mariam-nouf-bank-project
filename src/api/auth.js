import instance from ".";
import jwt_decode from "jwt-decode";

const register = async (userInfo) => {
  try {
    const formData = new FormData();
    for (const key in userInfo) formData.append(key, userInfo[key]);

    const { data } = await instance.post("/auth/v3/register", formData);

    storeToken(data.access);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const login = async (userInfo) => {
  try {
    const { data } = await instance.post("/auth/v3/login", userInfo);
    storeToken(data.access);
    return data;
  } catch (error) {
    return error;
  }
};

const profile = async () => {
  try {
    const { data } = await instance.get(`/auth/v3/profile`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getAllUsers = async () => {
  try {
    const { data } = await instance.get("/auth/v3/users");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwt_decode(token);
    const cureentTime = Date.now() / 1000;
    if (decode.exp < cureentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
  return false;
};
const logout = () => {
  localStorage.removeItem("token");
};

export { register, checkToken, logout, login, profile, getAllUsers };
