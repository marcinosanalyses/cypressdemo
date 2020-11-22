/// <reference types="cypress" />
describe("Checking filters with multiple attributes", () => {
    it("Checks if Filter component is available ", function () {
        cy.visit('/')
        cy.get('[href="/job-requests"] > .-flex-direction-column > .nav-item__container').contains('Find jobs').click() //Click Find jobs
        cy.get('.filters-buttons__wrapper > .el-button-ng')
        .should('contain','Filters')
        .click()
        cy.get('.filters-buttons__wrapper > .el-button-ng')
        .should('contain', 'Close filters')
        cy.get('.el-flex.-padding-top-md > .el-grid-row')
        .should('be.visible')
        .and('contain', 'Location radius') //Check if Location radius label is visible
        .and('contain', 'Remote work')
        .and('contain', 'Languages')
        .and('contain', 'Skills')
      });
    it("Set Remote work to Partially remote ", function () {
        cy.get('.el-flex.-padding-top-md > .el-grid-row > :nth-child(2) > .-padding')
        .should('contain','Fully remote')
        .and('contain','No remote')
        .and('contain','Partially remote')
        cy.get(':nth-child(3) > [type="checkbox"]').check({force: true}) //check Partially remote
        .should('be.checked') //Check if the Fully remote option is checked
    });
    it("Add few languages ", function () {
        cy.get('.el-flex > .el-form-select-next-wrapper > .el-form-select-next > .el-form-select-next__control').click()
        .type('English{enter}')
        .type('Swedish{enter}')
        cy.get(':nth-child(1) > .skill-badge > .el-flex > .el-t').should('have.text','English')
        cy.get(':nth-child(2) > .skill-badge > .el-flex > .el-t').should('have.text','Swedish')
        cy.get('.filters-buttons__wrapper > .el-button-ng').click() //close the filter button
    })
    it("Check if filter attributes are visible ", function () {
        cy.get('.floated-list > :nth-child(1) > .el-flex')
        .should('contain','Partially remote')
        cy.get('.floated-list > :nth-child(2) > .el-flex')
        .should('contain','English')
        cy.get('.floated-list > :nth-child(3) > .el-flex')
        .should('contain','Swedish')
    })
    it("Clear filters ", function () {
        cy.get('.floated-list > .el-button-ng > .-inner-margin > .el-flex').click() //Clear filters button
        cy.get('.floated-list > :nth-child(1) > .el-flex')
        .should('not.be.visible')
        cy.get('.floated-list > :nth-child(2) > .el-flex')
        .should('not.be.visible')
        cy.get('.floated-list > :nth-child(3) > .el-flex')
        .should('not.be.visible')
    })
});