const { defineConfig } = require("cypress");

module.exports = defineConfig({

  // retries pode ser colocado direto por exemplo retries: 2, ou dentro de e2e, por exemplo e2e: { retries: 2 }
  /*retries: {
    runMode: 2,
    openMode: 0, 
  },*/
  // retry CI only tbm e possivel, por exemplo: retries: { runMode: 2, openMode: 0, }, ou e2e: { retries: { runMode: 2, openMode: 0, }, }
  //limpar cookie e local storage antes de cada teste, por exemplo: e2e: { setupNodeEvents(on, config) { on('task', { clearCookiesAndLocalStorage() { cy.clearCookies(); cy.
  //  clearLocalStorage(); return null; }, }); }, }
  
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    retries: {
      runMode: 2,    // Quantidade de retries rodando via terminal (npx cypress run)
      openMode: 0,   // Quantidade de retries rodando no modo interativo (npx cypress open)
    },
    watchForFileChanges: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
});
