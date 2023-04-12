import { ethers, network, deployments } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { developmentChains } from "../helper-hardhat-config";

//depracated just for reference
describe("Log Contract", () => {
  let logContract: any;
  let mapContract: any;
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    if (!developmentChains.includes(network.name)) {
      throw "You need to be on a development chain to run tests";
    }
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    await deployments.fixture(["all"]);
  });

  it("Test event contract with 100 000 logs", async () => {
    logContract = await ethers.getContractFactory("AuditLog");
    console.log(logContract);
    for (let i = 0; i <= 100000; i++) {
      const result = await logContract.log(i, Math.random(), Math.random());
    }
  });

  it("Test map contract with 100 000 logs", async () => {
    mapContract = await ethers.getContractFactory("AuditLogEvents");
    for (let i = 0; i <= 100000; i++) {
      const result = await mapContract.log(i, Math.random(), Math.random());
    }
  });
});
