/// <reference types="cypress" />
describe("Checking filters with multiple attributes", () => {
    beforeEach(() => {
        cy.visit('/');
    });
        it("Add a skill and search ", function () {
            cy.get('.filter-input [placeholder= "Developer, Manager, ..."]').type('Test Automation Engineer'); //Type skills
            cy.intercept("**/api/public/locations/autocomplete?*").as("getLocations");
            cy.get('.el-form-select-next__control').type('Stockholm'); //Type Locations
            cy.wait("@getLocations").get('#react-select-2-option-0').click()
        });
        it("Add a skill and Location and search ", function () {
            //TO DO
        });
        it("Clear filters ", function () {
            //TO DO
        })
    })