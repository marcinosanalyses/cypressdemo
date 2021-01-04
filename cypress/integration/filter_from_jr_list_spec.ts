/// <reference types="cypress" />

describe("Checking filters with multiple attributes", () => {
    beforeEach(() => {
        cy.intercept("**/api/public/job-requests?*").as("getJobRequests");
        cy.visit('/'+'job-requests');
        cy.get('.button').contains('Filters').click();
        cy.wait("@getJobRequests")
    });
    it("Open, Close Filters", function () {
        cy.get('.button').contains('Close filters')
        cy.get('.section--border-radius > .section')
        cy.get('.section--border-radius > .el-flex.-padding-top-md')
        .should('be.visible');
        cy.get(':nth-child(2) > .-padding > .-flex-direction-row > .el-header')
        .should('have.text','Remote work')
        cy.get('.filters-buttons__wrapper')
        .should('contain','Close filters')
        .click();
    });
    it("Filter by Skills and Location in List view", function () {
        cy.intercept("**/api/public/locations/autocomplete?*").as("getLocations");
        cy.get('.filter-input .el-form-select-next__control')
        .type('Stockholm'); //Type Locations
        cy.wait("@getLocations").get('#react-select-2-option-0').click();
        cy.get('.rc-slider-step').click(25,0);
        cy.intercept("**/api/public/skills?*").as("getSkills");
        cy.get('.el-form-select-next__placeholder').eq(1).type('SQL');
        cy.wait("@getSkills");
        cy.focused().type("{enter}");
        cy.get('.el-form-select-next__placeholder').eq(1).type('.Net');
        cy.wait("@getSkills");
        cy.focused().type("{enter}");
        cy.get('.button').contains('Close filters').click();
        cy.get('.floated-list > :nth-child(2) > .el-flex')
        .should('be.visible')
        .and('have.text','SQL');
    });
});