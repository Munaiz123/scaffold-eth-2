import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { stringToHex, padHex } from "viem";

const deployTokenizedBallot: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Convert array of strings to bytes32 array
  const proposalNames = [
    padHex(stringToHex("Vanilla"), { size: 32 }),
    padHex(stringToHex("Chocolate"), { size: 32 }),
    padHex(stringToHex("Strawberry"), { size: 32 }),
  ];

  const tokenContractAddress = "0xA482e8367DD18b5E28B0aDF288D735E3d6cef5dE";
  const targetBlockNumber = 18535233; // Your past block number

  await deploy("TokenizedBallot", {
    from: deployer,
    log: true,
    args: [proposalNames, tokenContractAddress, targetBlockNumber],
    autoMine: true,
  });
};

export default deployTokenizedBallot;

deployTokenizedBallot.tags = ["Ballot"];
