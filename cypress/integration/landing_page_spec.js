/// <reference types="cypress" />
describe("Login in, Web form ", () => {
    beforeEach(() => {
      cy.fixture("core_config.json").as("CoreConfig");
      cy.visit('/')
      cy.get('.-margin > .route-button > .el-button-ng')
      .as('searchButton')
      });  
    context("Check if website is available", () => {  
      it("Display the landingpage", function () {
        cy.location('pathname').should('eq', '/')
      });
      it("check if login button is visible", function () {
        cy.get('[data-test=login--button]').contains('Log in') //check if Login button is available
      });
      it("check if Search button is visible", function () {
        cy.get('@searchButton') //using a search alias
        .should('be.visible')
        .and('contain','Search') //check if Search button is visible and contains Search text
      });
    });
    context("Check if support widgets are available", () => {  
      it("check if chat icon is available", function () {
        cy.visit('/')
        cy.get('#fc_widget').click()
      });
      it("check if cookies policy is visible", function () {
        cy.get('#cookies-bar > .-flex-align-flex-start')
        .invoke('text')
        .should('equal','By using this website, you agree to our cookie policy')
      });
    });
    context("Check if searching Job Ads works fine", () => {  
      it("check if searching by a skill works fine", function () {
        cy.get('.el-form-text').type('typescript')
        cy.get('@searchButton').click()
        cy.location().should((loc) => {
          expect(loc.search).to.include('typescript')
        })
        cy.get('.-margin > .el-flex > .el-header').contains('Open jobs')
      });
      it("check if searching by a location works fine", function () {
        const { location } = this.CoreConfig;
        cy.server()
        cy.route('GET', '/api/public/locations/autocomplete***').as('getLocations') ;//Select the job post location
        cy.get('.el-form-select-next__control')
        .type(location).wait('@getLocations')
        cy.get('#react-select-2-option-0')
        .contains('Oslo, Norge').click({ force: true})
        cy.get('.-margin > .route-button > .el-button-ng').click()
        cy.get('.-margin-top-sm > .el-flex > .el-header').contains('Open jobs') //check if Open jobs label is visible
        cy.get('.el-form-select-next__value-container').contains('Oslo')
        cy.get('.floated-list > :nth-child(1) > .el-flex')
        .invoke('text')
        .should('equal','20 km') //check if 20km radius is set
      });
    });
});
