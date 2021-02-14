class LoginPage {

    getUsernameInput() {
        return cy.get('[data-test=username--text-input]')
    }
    getPasswordInput() {
        return cy.get('[data-test=password--text-input]')
    }
    getSubmitButton() {
        return cy.get('[data-test=submit--button]')
    }
}
export default LoginPage