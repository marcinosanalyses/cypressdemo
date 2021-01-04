declare global {
    namespace Cypress {
      interface Chainable {
        // Generic methods
        loginWithCredentials: () => void;
        loginCompanyManager: () => void;
      }
      interface ResolvedConfigOptions {
      }
    }
  }
  
  export {};