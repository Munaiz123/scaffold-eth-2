"use client";

import { useEffect, useState } from "react";
import CheckVotingRightsCard from "./CheckVotingRightsCard";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import ERC20Card from "./ERC20Card";
import type { NextPage } from "next";
import { useAccount, useBalance, useReadContract, useSignMessage } from "wagmi";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <ERC20Card />
        <CheckVotingRightsCard />

        <div className="px-5"></div>
      </div>
    </>
  );
};

export default Home;
