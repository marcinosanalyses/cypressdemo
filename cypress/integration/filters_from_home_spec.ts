/// <reference types="cypress" />
describe("Checking filters with multiple attributes", () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.button').contains('Search').as('Search');
        cy.intercept("**/api/public/locations/autocomplete?*").as("getLocations");
        cy.intercept("**/api/public/job-requests?*").as("getJobRequests");
        cy.get('.filter-input [placeholder= "Developer, Manager, ..."]').as('keyword')
    });
        it("Add a Skill and search ", function () {
            cy.get('@keyword').type('Testing'); //Type skills
            cy.get('@Search')
            .click()
            cy.get('.el-form-text').should('have.value','Testing'); //check if the skill is available in the filter
        });
        it("Add a Skill and Location and search ", function () {
            cy.get('@keyword').type('Jira');
            cy.get('.el-form-select-next__control').type('Stockholm'); //Type Locations
            cy.wait("@getLocations").get('#react-select-2-option-0').click()
            cy.intercept("**/api/public/job-requests?*").as("getJobRequests");
            cy.get('@Search').click();
            cy.get('.el-form-text').should('have.value','Jira');
            cy.get('.filter-input').should('have.text','Stockholm'); //Check if location is set
        })
        it.only("Add two Skills, check if they are availble in request details", function () {
            cy.get('@keyword').type('Javascript, Typescript');
            cy.get('@Search').click();
            cy.get('.el-form-text').should('have.value','Javascript, Typescript');
            cy.get('.section > .-flex-align-flex-start').click();
            cy.intercept("**/api/public/job-requests/***/**").as("getJobRequestDetails");
            cy.wait('@getJobRequestDetails')
            cy.get('.html-renderer').contains('Javascript').contains('Typescript');
            
        })
    })