class FindJobs {

    getFiltersButton() {
        return cy.get('.filters-buttons__wrapper > .el-button-ng');
    }
    getTopMenu() {
        return cy.get('.-flex-direction-column > .nav-item__container');
    }
}

export default FindJobs