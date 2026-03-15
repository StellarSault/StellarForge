import {
  Keypair,
  Networks,
  TransactionBuilder,
  Operation,
  Asset,
  Memo,
  BASE_FEE,
} from "@stellar/stellar-sdk";
import { Horizon } from "@stellar/stellar-sdk";

// Load environment variables (use dotenv in production)
const SENDER_SECRET_KEY = process.env.SENDER_SECRET_KEY!;
const RECIPIENT_PUBLIC_KEY = process.env.RECIPIENT_PUBLIC_KEY!;
const AMOUNT = process.env.AMOUNT || "10";
const NETWORK = process.env.NETWORK || "testnet";

const HORIZON_URL =
  NETWORK === "mainnet"
    ? "https://horizon.stellar.org"
    : "https://horizon-testnet.stellar.org";

const NETWORK_PASSPHRASE =
  NETWORK === "mainnet" ? Networks.PUBLIC : Networks.TESTNET;

async function sendPayment() {
  if (!SENDER_SECRET_KEY || !RECIPIENT_PUBLIC_KEY) {
    throw new Error(
      "Missing SENDER_SECRET_KEY or RECIPIENT_PUBLIC_KEY environment variables"
    );
  }

  const server = new Horizon.Server(HORIZON_URL);

  // Derive the sender's keypair from the secret key
  const senderKeypair = Keypair.fromSecret(SENDER_SECRET_KEY);
  const senderPublicKey = senderKeypair.publicKey();

  console.log(`Sender:    ${senderPublicKey}`);
  console.log(`Recipient: ${RECIPIENT_PUBLIC_KEY}`);
  console.log(`Amount:    ${AMOUNT} XLM`);
  console.log(`Network:   ${NETWORK}`);

  // Load the sender's account to get the current sequence number
  const senderAccount = await server.loadAccount(senderPublicKey);

  // Build the transaction
  const transaction = new TransactionBuilder(senderAccount, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      Operation.payment({
        destination: RECIPIENT_PUBLIC_KEY,
        asset: Asset.native(), // XLM
        amount: AMOUNT,
      })
    )
    .addMemo(Memo.text("StellarForge payment"))
    .setTimeout(30) // transaction expires in 30 seconds
    .build();

  // Sign the transaction with the sender's secret key
  transaction.sign(senderKeypair);

  // Submit to the network
  const result = await server.submitTransaction(transaction);
  console.log(`\nSuccess! Transaction hash: ${result.hash}`);
  console.log(
    `View on explorer: https://stellar.expert/explorer/${NETWORK}/tx/${result.hash}`
  );
}

sendPayment().catch((err) => {
  console.error("Payment failed:", err?.response?.data?.extras ?? err.message);
  process.exit(1);
});
