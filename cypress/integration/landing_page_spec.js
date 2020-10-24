describe("Login in, Web form ", () => {
    beforeEach(() => {
      cy.visit('/')
      cy.fixture("core_config.json").as("CoreConfig");
      cy.get('.-margin > .route-button > .el-button-ng')
        .as('searchButton')

      });  
    context("Check if website is available", () => {  
      it("display worskspace selection page genaral URL", function () {
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
        cy.visit('/'); //check if website is available
        //TO DO
        // cy.get('@searchButton').click()
        // cy.location().should((loc) => {
        //   expect(loc.search).to.include('Oslo')
        // })
        // cy.get('.-margin > .el-flex > .el-header').contains('Open jobs')
      });
    });
});
