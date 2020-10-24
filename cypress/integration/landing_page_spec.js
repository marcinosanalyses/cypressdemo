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
});
