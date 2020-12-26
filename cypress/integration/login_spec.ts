/// <reference types="cypress" />
var randomNo = new Date().toISOString().split('.')[0].replace('T','').replace(':','').replace(':','')
const AccountEmail = 'test'+randomNo+'@test.test'
const LastName = 'LastName' + randomNo
describe("Create a Candidate", () => {
    it("Login as a Company Manager", function () {
        cy.loginCompanyManager()
    });
    it("Add a Candidate", function () {
        cy.get('[href="/app/my-team"] > :nth-child(1) > :nth-child(1) > .-flex-direction-column > .nav-item__container') //My Team
        .should('be.visible')
        .click();
        cy.get('.el-button-ng')
        .contains('Add new user')
        .click();
        cy.get('.el-shadow > .section')
        .should('be.visible');
        cy.get('.-flex-direction-column.-inner-margin-md > :nth-child(1) > .-flex-direction-row')
        .should('contain','Member')
        .click();
        cy.get(':nth-child(1) > .-flex-direction-column > .-flex > .el-form-text')
        .type('First Name');
        cy.get('.-flex-align-flex-start > :nth-child(2) > .-flex-direction-column > .-flex > .el-form-text')
        .type(LastName);
        cy.get('.-flex-direction-column.-inner-margin > :nth-child(2) > .-flex-direction-column > .-flex > .el-form-text')
        .type(AccountEmail);
        cy.intercept("**/api/public/locations/autocomplete?*").as("getLocations");
        cy.get('.-flex-direction-column.-width-xxs-12 > .-flex-direction-column > .typeahead > .el-form-select-next-wrapper > .el-form-select-next > .el-form-select-next__control')
        .type('Stockholm');
        cy.wait('@getLocations');
        cy.get("#react-select-10-option-0").contains("Stockholm", {
          matchCase: false
        }).click();
        cy.get('.-flex-direction-column.-inner-margin > .el-form-checkbox > .el-form-checkbox__shape')
        .click();
        cy.get('[data-test=submit--button]')
        .click();
    });
});