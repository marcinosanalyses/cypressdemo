/* eslint-disable @typescript-eslint/no-use-before-define,@typescript-eslint/no-namespace */
const SHOULD_STUB = true;
Cypress.Commands.add("loginWithCredentials", (email = "", password = "") => {
    cy.get('[data-test=submit--button]').should("be.visible");
    cy.get('[data-test=username--text-input]').clear().type(email);
    cy.get('[data-test=password--text-input]').clear().type(password).type("{enter}");
  });

Cypress.Commands.add('loginCompanyManager', () => {
    cy.visit('/'); //visit the default url
    cy.get('[data-test=login--button]')
    .contains('Log in')
    .click();
    cy.loginWithCredentials(`${Cypress.env("users").manager.email}`, `${Cypress.env("users").manager.password}`);
});