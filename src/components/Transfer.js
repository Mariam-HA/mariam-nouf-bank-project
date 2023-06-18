import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../api/auth";
import { transfer } from "../api/balance";

const Transfer = () => {
  const { userName } = useParams();

  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [username, setUser] = useState("");

  const [receiver, setReceiver] = useState("");

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const query = useQuery({
    queryKey: ["fund", userName],
    queryFn: () => transfer(userName),
  });

  const { error, mutate: transferFun } = useMutation({
    mutationFn: () => transfer(amount, receiver),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fund", userName] });
    },
  });

  const changeBalance = (e) => {
    e.preventDefault();
    transferFun();
  };

  //   if (!userName) return <div>Username Not found!</div>;

  if (error) return `An error occurred: ${error.message}`;

  return (
    <div>
      <form onSubmit={changeBalance}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          username:
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </label>

        <div>
          {error && <p className="text-red-500">{error.message}</p>}
          <button type="submit"> Transfer </button>
        </div>
      </form>
    </div>
  );
};

export default Transfer;
