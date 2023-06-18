import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { deposit, userBalance } from "../api/balance";

const DepositFunds = () => {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  //   const [error, setError] = useState("");
  const query = useQuery({ queryKey: ["fund"], queryFn: deposit });

  const { error, mutate: depositFun } = useMutation({
    mutationFn: () => deposit(amount),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fund"] });
    },
  });

  const handleFundsChange = () => {
    depositFun();
  };

  const changeBalance = (e) => {
    e.preventDefault();
    depositFun(amount);
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
          <button type="submit">Deposit</button>
        </div>
      </form>
    </div>
  );
};

export default DepositFunds;
