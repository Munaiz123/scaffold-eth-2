import { useState } from "react";

export default function CheckVotingRightsCard() {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [votingRights, setVotingRights] = useState<{ hasRights: boolean; balance: string } | null>(null);

  const checkRights = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/votes/checkVotingRights?walletAddress=${walletAddress}`);
      const data = await response.json();
      setVotingRights(data);
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
      setVotingRights(null);
    } finally {
      setLoading(false);
    }
  };

  const resetOnclick = () => {
    setWalletAddress("");
    setLoading(false);
    setVotingRights(null);
  };

  return (
    <div className="card bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Check Voting Rights</h2>
        <h1>Enter wallet address to check voting power</h1>
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

      <button className="btn btn-active btn-neutral" onClick={checkRights} disabled={loading}>
        {loading ? "Checking..." : "Check Rights"}
      </button>

      <button className="btn btn-active btn-neutral" onClick={resetOnclick} disabled={loading}>
        reset
      </button>

      {votingRights && (
        <div>
          <h3 className="text-lg font-bold">
            Status: {votingRights.hasRights ? "Has Voting Rights" : "No Voting Rights"}
          </h3>
          <p className="text-md">Token Balance: {votingRights.balance}</p>
        </div>
      )}
    </div>
  );
}
