const hre = require("hardhat");

const contractAddress = "0xD00FA8c384a52fBE24b72e09296e0254DDc16fFb";
const initialOwnerAddress = "0x63a9fe48fFc5e6B7428025A24C629e430247D82c";

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    // Deploy the CryptoDevs Contract
    // const nftContract = await hre.ethers.deployContract("CryptoDevs", [contractAddress]);
    const nftContract = await hre.ethers.deployContract("CryptoDevs", [contractAddress, initialOwnerAddress]);

    // wait for the contract to deploy
    await nftContract.waitForDeployment();

    // print the address of the deployed contract
    console.log("NFT Contract Address:", nftContract.target);

    // Sleep for 30 seconds while Etherscan indexes the new contract deployment
    await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

    // Verify the contract on etherscan
    await hre.run("verify:verify", {
        address: nftContract.target,
        constructorArguments: [contractAddress, initialOwnerAddress],
    });
    // const CryptoDevs = await hre.ethers.getContractFactory("CryptoDevs");
    // const cryptoDevs = await CryptoDevs.deploy(contractAddress, initialOwnerAddress);
    // await cryptoDevs.waitForDeployment();
    // console.log("CryptoDevs deployed to:", cryptoDevs.target);

}

// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });