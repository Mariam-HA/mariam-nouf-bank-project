import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loggedInTransactions } from "../api/balance";

const Transactions = () => {
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");

  const {
    isLoading,
    error,
    data: transactions,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: () => loggedInTransactions(),
  });

  const { mutate: myTransaction } = useMutation({
    mutationFn: () => loggedInTransactions(),
    onSuccess: queryClient.invalidateQueries({ queryKey: ["transaction"] }),
  });

  const handleTransactions = () => {
    myTransaction();
  };

  if (isLoading) return "Loading transactions...";

  if (error) return `An error occurred: ${error.message}`;

  const colorCode = (type) => {
    switch (type) {
      case "deposit":
        return "text-green-500";
      case "withdraw":
        return "text-red-500";
      case "transfer":
        return "text-red-500";
      default:
        return "text-black";
    }
  };

  let filteredTransactions = transactions;

  // filter transactions based on filters if they are set

  // not sure about this
  if (startDate && endDate) {
    filteredTransactions = filteredTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      return (
        transactionDate >= new Date(startDate) &&
        transactionDate <= new Date(endDate)
      );
    });
  }

  if (amount) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.amount === amount
    );
  }
  //

  return (
    <div>
      <h1>Transactions</h1>
      <div>
        <label>Start Date</label>
        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>End Date</label>
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div>
        <label>Amount</label>
        <input type="number" onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div className="m-7">
        <button> search</button>
      </div>

      {filteredTransactions.map((transaction, index) => (
        <p key={index} className={colorCode(transaction.type)}>
          {transaction.type} [{transaction.amount} KD]
        </p>
      ))}

      {/* For each transaction, a new paragraph element is being created. */}
      {/* the index of the transaction in the array is being used as the key. */}
    </div>
  );
};

export default Transactions;

// import React from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { loggedInTransactions } from "../api/balance";

// const Transactions = () => {
//   const queryClient = useQueryClient();
//   const { data: transactions } = useQuery({
//     queryKey: ["transaction"],
//     queryFn: () => loggedInTransactions(),
//   });
//   const { mutate: myTransaction } = useMutation({
//     mutationFn: () => loggedInTransactions(),
//     onSuccess: queryClient.invalidateQueries({ queryKey: ["transaction"] }),
//   });
//   const handleTransactions = () => {
//     transactions();
//   };
//   //   if (!credit) return "";
//   return (
//     <div>
//       <h1>Transactions</h1>
//       {transactions?.map((transaction) => (
//         <p>
//           {transaction.type} [{transaction.amount} KD]
//         </p>
//       ))}
//     </div>
//   );
// };

// export default Transactions;
