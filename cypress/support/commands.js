import LoginPage from '../support/pages/LoginPage'
const loginPage = new LoginPage
/// <reference types="cypress" />
// const SHOULD_STUB = true;

Cypress.Commands.add("loginWithCredentials", (email = "", password = "") => {
    loginPage.getSubmitButton().should("be.visible");
    loginPage.getUsernameInput().clear().type(email);
    loginPage.getPasswordInput().clear().type(password).type("{enter}");
  });

Cypress.Commands.add('loginCompanyManager', () => {
    cy.visit('/'); //visit the default url
    cy.get('[data-test=login--button]')
    .contains('Log in')
    .click();
    cy.loginWithCredentials(`${Cypress.env("users").manager.email}`, `${Cypress.env("users").manager.password}`);
});