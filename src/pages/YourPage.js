import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { profile, register } from "../api/auth";
import UserContext from "../context/UseContext";
import { userBalance } from "../api/balance";
import Transactions from "../components/Transactions";
import Filter from "../components/Filter";

const YourPage = () => {
  const [user, setUser] = useContext(UserContext);
  const queryClient = useQueryClient();

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: () => profile(),
  });
  const { data: credit } = useQuery({
    queryKey: ["credit"],
    queryFn: () => userBalance(),
  });

  const { mutate: profileFun } = useMutation({
    mutationFn: () => register(),
    onSuccess: queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  const { mutate: myBalance } = useMutation({
    mutationFn: () => userBalance(),
    onSuccess: queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  const handleChange = () => {
    profileFun();
  };

  const handleBalance = () => {
    myBalance();
  };

  if (!user || !credit) return "";

  return (
    <div>
      <div className="flex flex-col items-center justify-start h-screen bg-slate-50 p-8">
        <div>
          <img
            className="rounded-full h-[200px]  bg-emerald-200"
            src={`https://coded-projects-api.herokuapp.com ${me.image}`}
          />
          <h2 className="font-bold">{me.username}</h2>
          <h3 className="text-xl font-semibold">{`Balance: ${credit.balance} KD`}</h3>
        </div>
        <div className="m-6">
          <Transactions />
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default YourPage;
