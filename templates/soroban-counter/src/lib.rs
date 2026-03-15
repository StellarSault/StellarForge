#![no_std]

use soroban_sdk::{contract, contractimpl, log, Env, Symbol};

/// Storage key for the counter value
const COUNTER: Symbol = Symbol::short("COUNTER");

#[contract]
pub struct CounterContract;

#[contractimpl]
impl CounterContract {
    /// Increment the counter by 1 and return the new value.
    pub fn increment(env: Env) -> u32 {
        // Read the current counter value, defaulting to 0 if not set
        let mut count: u32 = env.storage().instance().get(&COUNTER).unwrap_or(0);

        // Increment
        count += 1;

        // Persist the updated value
        env.storage().instance().set(&COUNTER, &count);

        log!(&env, "Counter incremented to: {}", count);

        count
    }

    /// Return the current counter value without modifying it.
    pub fn get(env: Env) -> u32 {
        env.storage().instance().get(&COUNTER).unwrap_or(0)
    }

    /// Reset the counter to zero.
    pub fn reset(env: Env) {
        env.storage().instance().set(&COUNTER, &0u32);
        log!(&env, "Counter reset to 0");
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::Env;

    #[test]
    fn test_increment() {
        let env = Env::default();
        let contract_id = env.register_contract(None, CounterContract);
        let client = CounterContractClient::new(&env, &contract_id);

        assert_eq!(client.get(), 0);
        assert_eq!(client.increment(), 1);
        assert_eq!(client.increment(), 2);
        assert_eq!(client.increment(), 3);
    }

    #[test]
    fn test_reset() {
        let env = Env::default();
        let contract_id = env.register_contract(None, CounterContract);
        let client = CounterContractClient::new(&env, &contract_id);

        client.increment();
        client.increment();
        assert_eq!(client.get(), 2);

        client.reset();
        assert_eq!(client.get(), 0);
    }
}
