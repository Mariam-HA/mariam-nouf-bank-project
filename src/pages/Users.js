import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllUsers } from "../api/auth";

const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
        <h1 className="col-span-full mb-4 font-bold text-[40px]">Users List</h1>
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-bold mb-2">{user.username}</h2>
            {/* <p className="text-gray-600">{`Balance: ${user.balance} KD`}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
