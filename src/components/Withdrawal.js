import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { withdrawal } from "../api/balance";

const Withdrawal = () => {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  //   const [error, setError] = useState("");
  const query = useQuery({ queryKey: ["fund"], queryFn: withdrawal });

  const { error, mutate: withdrawFun } = useMutation({
    mutationFn: () => withdrawal(amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fund"] });
    },
  });

  const changeBalance = (e) => {
    e.preventDefault();
    withdrawFun(amount);
  };

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
        <div>
          {error && <p className="text-red-500">{error.message}</p>}
          <button type="submit"> Withdraw </button>
        </div>
      </form>
    </div>
  );
};

export default Withdrawal;
