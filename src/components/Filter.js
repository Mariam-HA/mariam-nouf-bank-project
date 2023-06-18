import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { loggedInTransactions } from "../api/balance";
import DepositFunds from "../components/DepositFunds";
import Withdrawal from "./Withdrawal";
import Transfer from "./Transfer";

const Transactions = () => {
  const [filterType, setFilterType] = useState("");

  const { data: transactions } = useQuery({
    queryKey: ["transaction"],
    queryFn: () => loggedInTransactions(),
  });

  const filteredTransactions = transactions?.filter(
    (transaction) => transaction.type === filterType
  );

  return (
    <div>
      <h1>Transactions</h1>

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="">All</option>
        <option value="transfer">Transfer</option>
        <option value="withdraw">Withdraw</option>
        <option value="deposit">Deposit</option>
      </select>

      {filterType === "deposit" ? (
        <DepositFunds /> // show the deposit form when 'Deposit' is selected
      ) : (
        filteredTransactions?.map((transaction) => (
          <p key={transaction.id}>
            {transaction.type} [{transaction.amount} KD]
          </p>
        ))
      )}
      {/* check if filterType is deposit. If it is, it will render the deposite component.
       If not, it will render a list of transactions. */}

      {filterType === "withdraw" ? (
        <Withdrawal />
      ) : (
        filteredTransactions?.map((transaction) => (
          <p key={transaction.id}>
            {transaction.type} [{transaction.amount} KD]
          </p>
        ))
      )}

      {filterType === "transfer" ? (
        <Transfer />
      ) : (
        filteredTransactions?.map((transaction) => (
          <p key={transaction.id}>
            {transaction.type} [{transaction.amount} KD]
          </p>
        ))
      )}
    </div>
  );
};

export default Transactions;
