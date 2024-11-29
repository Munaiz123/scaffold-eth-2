import { useState } from "react";

export default function ERC20Card() {
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const giveVotingPower = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          walletAddress,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);
      setAmount("");
      setWalletAddress("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">MyERC20.sol deployed on Base Sepolia </h2>
        <h1> Address: 0xA482e8367DD18b5E28B0aDF288D735E3d6cef5dE </h1>
        <h1> BlockNumber: 18535233</h1>
      </div>

      <div className="form-control w-full my-4">
        <input
          type="text"
          placeholder="Amount"
          className="input input-bordered w-full"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <div className="form-control w-full my-4">
        <input
          type="text"
          placeholder="Wallet Address"
          className="input input-bordered w-full"
          value={walletAddress}
          onChange={e => setWalletAddress(e.target.value)}
        />
      </div>
      <button className="btn btn-active btn-neutral" onClick={giveVotingPower} disabled={loading}>
        {loading ? "Processing..." : "Give Voting Power"}
      </button>
    </div>
  );
}
