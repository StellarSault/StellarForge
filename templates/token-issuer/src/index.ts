import {
  Keypair,
  Networks,
  TransactionBuilder,
  Operation,
  Asset,
  BASE_FEE,
} from "@stellar/stellar-sdk";
import { Horizon } from "@stellar/stellar-sdk";

const ISSUER_SECRET_KEY = process.env.ISSUER_SECRET_KEY!;
const DISTRIBUTOR_SECRET_KEY = process.env.DISTRIBUTOR_SECRET_KEY!;
const ASSET_CODE = process.env.ASSET_CODE || "MYTOKEN";
const ISSUE_AMOUNT = process.env.ISSUE_AMOUNT || "1000000";
const NETWORK = process.env.NETWORK || "testnet";

const HORIZON_URL =
  NETWORK === "mainnet"
    ? "https://horizon.stellar.org"
    : "https://horizon-testnet.stellar.org";

const NETWORK_PASSPHRASE =
  NETWORK === "mainnet" ? Networks.PUBLIC : Networks.TESTNET;

async function issueToken() {
  if (!ISSUER_SECRET_KEY || !DISTRIBUTOR_SECRET_KEY) {
    throw new Error("Missing ISSUER_SECRET_KEY or DISTRIBUTOR_SECRET_KEY");
  }

  const server = new Horizon.Server(HORIZON_URL);

  const issuerKeypair = Keypair.fromSecret(ISSUER_SECRET_KEY);
  const distributorKeypair = Keypair.fromSecret(DISTRIBUTOR_SECRET_KEY);

  // Define the custom asset
  const asset = new Asset(ASSET_CODE, issuerKeypair.publicKey());

  console.log(`Asset:        ${ASSET_CODE}:${issuerKeypair.publicKey()}`);
  console.log(`Distributor:  ${distributorKeypair.publicKey()}`);
  console.log(`Issue amount: ${ISSUE_AMOUNT}`);

  // --- Step 1: Distributor creates a trustline for the asset ---
  // The distributor must opt-in to hold the asset before it can receive it
  console.log("\nStep 1: Creating trustline from distributor to issuer...");
  const distributorAccount = await server.loadAccount(
    distributorKeypair.publicKey()
  );

  const trustlineTx = new TransactionBuilder(distributorAccount, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      Operation.changeTrust({
        asset,
        // Omitting 'limit' sets it to the maximum allowed
      })
    )
    .setTimeout(30)
    .build();

  trustlineTx.sign(distributorKeypair);
  await server.submitTransaction(trustlineTx);
  console.log("Trustline created.");

  // --- Step 2: Issuer sends the asset to the distributor ---
  // This mints the tokens into existence
  console.log(`\nStep 2: Issuing ${ISSUE_AMOUNT} ${ASSET_CODE} to distributor...`);
  const issuerAccount = await server.loadAccount(issuerKeypair.publicKey());

  const issuanceTx = new TransactionBuilder(issuerAccount, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      Operation.payment({
        destination: distributorKeypair.publicKey(),
        asset,
        amount: ISSUE_AMOUNT,
      })
    )
    .setTimeout(30)
    .build();

  issuanceTx.sign(issuerKeypair);
  const result = await server.submitTransaction(issuanceTx);

  console.log(`\nSuccess! Transaction hash: ${result.hash}`);
  console.log(
    `View on explorer: https://stellar.expert/explorer/${NETWORK}/tx/${result.hash}`
  );
  console.log(
    `\nTip: To prevent further issuance, lock the issuer account by setting its master weight to 0.`
  );
}

issueToken().catch((err) => {
  console.error("Issuance failed:", err?.response?.data?.extras ?? err.message);
  process.exit(1);
});
