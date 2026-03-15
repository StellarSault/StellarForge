# Contributing to StellarForge

Thanks for your interest in contributing. Here's how to get involved.

## Adding a Template

1. Create a new folder under `templates/your-template-name/`
2. Include a `README.md` explaining:
   - What the template does
   - Prerequisites
   - How to run it
   - Any environment variables
3. Keep the code minimal and well-commented — these are starter templates, not production apps
4. Open a pull request with a short description of what your template demonstrates

## Guidelines

- One template = one focused concept
- No unnecessary dependencies
- Prefer `testnet` as the default network in examples
- Never commit real secret keys — use `.env.example` files
- TypeScript for Node.js templates, Rust for Soroban contracts

## Reporting Issues

Open a GitHub issue with:
- Which template is affected
- Steps to reproduce
- Expected vs actual behavior

## Code of Conduct

Be respectful and constructive. That's it.
