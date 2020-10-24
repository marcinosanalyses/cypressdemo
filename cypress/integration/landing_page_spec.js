describe("Login in, Web form ", () => {
    beforeEach(() => {
        cy.fixture("core_config.json").as("CoreConfig");
      });  
    context("Check if website is available", () => {  
      it("display worskspace selection page genaral URL", function () {
        cy.visit('/'); //check if website is available
      });
      it("check if login button is visible", function () {
        cy.get('[data-test=login--button]').contains('Log in') //check if Login button is available
      });
      it("check if login button is visible", function () {
        cy.get('.-margin > .route-button > .el-button-ng')
        .should('be.visible')
        .and('contain','Search') //check if Search button is visible and contains Search text
      });
      
    });
});
