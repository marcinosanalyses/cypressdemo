class LandingPage {

    getSearchButton() {
        return cy.get('.-margin > .route-button > .el-button-ng');
    }
    getTopMenu() {
        return cy.get('.-flex-direction-column > .nav-item__container');
    }
}

export default LandingPage