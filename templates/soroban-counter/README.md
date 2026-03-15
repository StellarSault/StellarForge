# soroban-counter

A minimal Soroban smart contract on Stellar that maintains an on-chain counter.

## Functions

| Function    | Description                          |
|-------------|--------------------------------------|
| `increment` | Adds 1 to the counter, returns new value |
| `get`       | Returns the current counter value    |
| `reset`     | Resets the counter to 0              |

## Prerequisites

- [Rust](https://rustup.rs/) with `wasm32-unknown-unknown` target
- [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools/cli/install-stellar-cli)

```bash
rustup target add wasm32-unknown-unknown
```

## Build

```bash
cargo build --target wasm32-unknown-unknown --release
```

The compiled `.wasm` file will be at:
`target/wasm32-unknown-unknown/release/soroban_counter.wasm`

## Test

```bash
cargo test
```

## Deploy to Testnet

```bash
# Configure the Stellar CLI for testnet
stellar network add testnet \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"

# Generate or import an identity
stellar keys generate alice --network testnet

# Deploy the contract
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/soroban_counter.wasm \
  --source alice \
  --network testnet
```

## Invoke

```bash
# Increment the counter
stellar contract invoke \
  --id <CONTRACT_ID> \
  --source alice \
  --network testnet \
  -- increment

# Read the counter
stellar contract invoke \
  --id <CONTRACT_ID> \
  --source alice \
  --network testnet \
  -- get
```
