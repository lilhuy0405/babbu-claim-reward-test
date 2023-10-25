import { AbiCoder, ethers } from "ethers";
import 'dotenv/config';
async function main() {
  const privateKey = process.env.PRIVATE_KEY;


  const recipient = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';
  const amount = ethers.parseEther("1").toString();
  const nonce = Date.now();
  console.log("recipient, amount, nonce:", recipient, amount, nonce);
  const coder = AbiCoder.defaultAbiCoder()
  const message = coder.encode(
    ["address", "uint256", "uint256"],
    [recipient, amount, nonce]
  );
  console.log("message:", message);
  //covert message to bytes
  // const messageBytes = ethers.toUtf8Bytes(message);
  //hash message
  const hashedMsg = ethers.keccak256(message);
  console.log("hashed msg:", hashedMsg);

  const rpcUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545';
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);
  // console.log(signer.address);
  const signature = await signer.signMessage(ethers.getBytes(hashedMsg));
  //split signature to get r, s, v
  const splitted = ethers.Signature.from(signature);
  console.log('r:', splitted.r);
  console.log('s:', splitted.s);
  console.log('v:', splitted.v);
}
main().then();