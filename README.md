# StellarForge

A collection of minimal starter templates for developers building on the [Stellar](https://stellar.org) blockchain.

## Templates

| Template | Stack | Description |
|---|---|---|
| [payment-node](templates/payment-node) | Node.js / TypeScript | Send XLM between two accounts |
| [token-issuer](templates/token-issuer) | Node.js / TypeScript | Issue a custom asset on Stellar |
| [soroban-counter](templates/soroban-counter) | Rust / Soroban | On-chain counter smart contract |

## Quick Start

Pick a template, install its dependencies, and follow its README:

```bash
# Example: run the payment template
cd templates/payment-node
npm install
cp .env.example .env
# edit .env with your keys
npm run dev
```

## Prerequisites

- Node.js 18+ (for TypeScript templates)
- Rust + `wasm32-unknown-unknown` target (for Soroban templates)
- [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools/cli/install-stellar-cli) (for deploying contracts)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
