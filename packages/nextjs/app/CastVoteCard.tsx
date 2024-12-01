import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";

const PROPOSALS = [
  { id: 0, name: "Vanilla" },
  { id: 1, name: "Chocolate" },
  { id: 2, name: "Strawberry" },
  { id: 3, name: "Tres Leches" },
];

const tokenContractAddress = "0xA482e8367DD18b5E28B0aDF288D735E3d6cef5dE";
const ballotAddress = "0xebB21875df60a363442AB665673e20d293E81188";

export default function CastVoteCard() {
  const { address } = useAccount();
  const [proposal, setProposal] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const { writeContract, isPending } = useWriteContract();

  const handleVote = async () => {
    if (!address) {
      setResult("Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);

      await writeContract(
        {
          address: tokenContractAddress,
          abi: [
            {
              name: "approve",
              type: "function",
              stateMutability: "nonpayable",
              inputs: [
                { name: "spender", type: "address" },
                { name: "amount", type: "uint256" },
              ],
              outputs: [{ name: "", type: "bool" }],
            },
          ],
          functionName: "approve",
          args: [ballotAddress, BigInt(amount)],
        },
        {
          onSuccess: async () => {
            const response = await fetch("http://localhost:3001/votes/cast", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                proposal: Number(proposal),
                amount,
                walletAddress: address,
              }),
            });

            const data = await response.json();
            console.log("Response:", data);
            setResult(data.result);
            setProposal("");
            setAmount("");
          },
          onError: error => {
            console.error("Approval Error:", error);
            setResult("Error approving tokens");
          },
        },
      );
    } catch (error) {
      console.error("Error:", error);
      setResult("Error casting vote");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProposal("");
    setAmount("");
    setResult(null);
  };

  return (
    <div className="card bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Cast Your Vote</h2>
        <h1>Enter voting details</h1>
        {address && <p className="text-sm">Voting with wallet: {address}</p>}
      </div>

      <div className="form-control w-full my-4">
        <select className="select select-bordered w-full" value={proposal} onChange={e => setProposal(e.target.value)}>
          <option value="" disabled>
            Select a proposal
          </option>
          {PROPOSALS.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full my-4">
        <input
          type="text"
          placeholder="Amount of Voting Power"
          className="input input-bordered w-full"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      <div className="flex gap-2 mx-4 mb-4">
        <button
          className="btn btn-active btn-neutral flex-1"
          onClick={handleVote}
          disabled={loading || !address || isPending}
        >
          {!address ? "Connect Wallet" : isPending ? "Approving..." : loading ? "Casting Vote..." : "Cast Vote"}
        </button>

        <button className="btn btn-active btn-secondary flex-1" onClick={resetForm} disabled={loading || isPending}>
          Reset
        </button>
      </div>

      {result && (
        <div className="p-4">
          <p className="text-md">{result}</p>
        </div>
      )}
    </div>
  );
}
