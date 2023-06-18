import instance from ".";

const userBalance = async () => {
  try {
    const { data } = await instance.get(`/bank/v3/balance`);
    return data;
    //console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const loggedInTransactions = async () => {
  try {
    const { data } = await instance.get(`/bank/v3/transactions`);
    return data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const deposit = async (amount) => {
  const { data } = await instance.post(`/bank/v3/deposit`, { amount });
  return data;
};

const withdrawal = async (amount) => {
  const { data } = await instance.put(`/bank/v3/withdraw`, { amount });
  return data;
};

const transfer = async (userName, amount) => {
  const { data } = await instance.post(`/bank/v3/transfer/${userName}`, {
    amount,
  });
  return data;
};
export { userBalance, loggedInTransactions, deposit, withdrawal, transfer };
