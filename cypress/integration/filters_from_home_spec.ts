/// <reference types="cypress" />
describe("Checking filters with multiple attributes", () => {
    beforeEach(() => {
        cy.visit('/');
    });
        it("Add a Skill and search ", function () {
            cy.get('.filter-input [placeholder= "Developer, Manager, ..."]').type('Testing'); //Type skills
            cy.intercept("**/api/public/job-requests?*").as("getJobRequests");
            cy.get('.button').contains('Search').click();
            cy.wait("@getJobRequests"); //wait for Job Requests list
            cy.get('.el-form-text').should('have.value','Testing'); //check if the skill is available in the filter
        });
        it("Add a Skill and Location and search ", function () {
            cy.get('.filter-input [placeholder= "Developer, Manager, ..."]').type('Jira');
            cy.intercept("**/api/public/locations/autocomplete?*").as("getLocations");
            cy.get('.el-form-select-next__control').type('Stockholm'); //Type Locations
            cy.wait("@getLocations").get('#react-select-2-option-0').click()
            cy.intercept("**/api/public/job-requests?*").as("getJobRequests");
            cy.get('.button').contains('Search').click();
            cy.wait("@getJobRequests");
            cy.get('.el-form-text').should('have.value','Jira');
            cy.get('.filter-input').should('have.text','Stockholm'); //Check if location is set
    })
})