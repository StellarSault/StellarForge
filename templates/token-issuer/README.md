# token-issuer

Issue a custom asset (token) on the Stellar network using an issuing account and a distribution account.

## How it works

1. The distributor account creates a **trustline** for the asset — opting in to hold it.
2. The issuer account **sends** the asset to the distributor, minting it into existence.

## Setup

```bash
npm install
cp .env.example .env
# Fill in both account secret keys in .env
```

## Run

```bash
npm run dev
# or: npm run build && npm start
```

## Environment Variables

| Variable               | Description                                      |
|------------------------|--------------------------------------------------|
| `ISSUER_SECRET_KEY`    | Secret key of the account that creates the asset |
| `DISTRIBUTOR_SECRET_KEY` | Secret key of the account that holds/distributes |
| `ASSET_CODE`           | Token ticker, up to 12 chars (default: `MYTOKEN`) |
| `ISSUE_AMOUNT`         | How many tokens to mint (default: `1000000`)     |
| `NETWORK`              | `testnet` or `mainnet`                           |

## Notes

- Both accounts must be funded before running.
- To make the supply fixed, set the issuer's master weight to 0 after issuance (`setOptions` with `masterWeight: 0`).
- Use [Stellar Laboratory](https://laboratory.stellar.org) to inspect accounts and transactions.
