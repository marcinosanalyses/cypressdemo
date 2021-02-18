
const filterButton = ('.filters-buttons__wrapper');
const topMenu = ('.-flex-direction-column > .nav-item__container');


Cypress.Commands.add("getFilterButton", () => {
    cy.get(filterButton).should('be.visible').and('have.text','Filters')
});