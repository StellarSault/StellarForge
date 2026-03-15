# payment-node

Send XLM from one Stellar account to another using the Stellar SDK.

## Setup

```bash
npm install
cp .env.example .env
# Fill in your keys in .env
```

## Run

```bash
# Development (ts-node)
npm run dev

# Or build and run
npm run build
npm start
```

## Environment Variables

| Variable             | Description                          |
|----------------------|--------------------------------------|
| `SENDER_SECRET_KEY`  | Secret key of the sending account    |
| `RECIPIENT_PUBLIC_KEY` | Public key of the recipient        |
| `AMOUNT`             | XLM amount to send (default: `10`)   |
| `NETWORK`            | `testnet` or `mainnet` (default: `testnet`) |

## Get Testnet Funds

Use the [Stellar Friendbot](https://friendbot.stellar.org/?addr=YOUR_PUBLIC_KEY) to fund a testnet account.
