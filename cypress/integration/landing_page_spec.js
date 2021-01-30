/// <reference types="cypress" />
import LandingPage from '../integration/pages/LandingPage'
const landingPage = new LandingPage

describe("Landing Page tests", () => {
    beforeEach(() => {
      cy.fixture("core_config.json").as('CoreConfig');
      cy.fixture('testdata').then(function (testdata) {
        this.testdata = testdata
      })
      cy.visit('/')

    })
    context("Check if website is available", () => {  
      it("Display the landingpage", function () {
        cy.location('pathname').should('eq', '/en/')
      });
      it('Validate all to Menu Texts', function () {
        landingPage.getTopMenu().each(($el, index) => {
            expect($el).to.contain(this.testdata.topMenu[index])
        });
      })
      it("check if login button is visible", function () {
        cy.get('[data-test=login--button]').contains('Log in') //check if Login button is available
      });
      it("check if Search button is visible", function () {
        landingPage.getSearchButton() //using a search alias
        .should('be.visible')
        .and('contain','Search') //check if Search button is visible and contains Search text
      });
      it('Validate Page Title', () => {
        cy.title().should('eq', 'Verama - marketplace where talent and talent-seekers meet')
    })
    });
    context("Check if support widgets are available", () => {  
      it("check if chat icon is available", function () {
        cy.visit('/')
        cy.get('#fc_widget').click()
      });
      it("check if cookies policy is visible", function () {
        cy.get('#cookies-bar > .-flex-align-flex-start')
        .invoke('text')
        .should('equal','By using this website, you agree to our cookie policy')
      });
    });
    context("Check if searching Job Ads works fine", () => {  
      it("check if searching by a skill works fine", function () {
        cy.get('.el-form-text').type('typescript')
        landingPage.getSearchButton().click()
        cy.location().should((loc) => {
          expect(loc.search).to.include('typescript')
        })
        cy.get('.-margin > .el-flex > .el-header').contains('Open jobs')
      });
      it("check if searching by a location works fine", function () {
        const { location } = this.CoreConfig;
        cy.server()
        cy.route('GET', '/api/public/locations/autocomplete***').as('getLocations') ;//Select the job post location
        cy.get('.el-form-select-next__control')
        .type(location).wait('@getLocations')
        cy.get('#react-select-2-option-0')
        .contains('Oslo, Norge').click({ force: true})
        cy.get('.-margin > .route-button > .el-button-ng').click()
        cy.get('.-margin-top-sm > .el-flex > .el-header').contains('Open jobs') //check if Open jobs label is visible
        cy.get('.el-form-select-next__value-container').contains('Oslo')
        cy.get('.floated-list > :nth-child(1) > .el-flex')
        .invoke('text')
        .should('equal','20 km') //check if 20km radius is set
      });
    });
});
