//Random
const genRandomString = (length) => {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let itr = 0; itr < length; itr++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
//contains
const directlyContainsText = (text) =>
  `(contains(text(),"${text}") or contains(.,"${text}") or contains(@data-text-as-pseudo-element,"${text}"))`;

const directlyEqualsText = (text) =>
  `(text() = "${text}" or @data-text-as-pseudo-element = "${text}")`;

const containsText = (text) =>
  `(${directlyContainsText(text)} or .//*[${directlyContainsText(text)}])`;

//equals
const equalsText = (text) =>
  `(${directlyEqualsText(text)} or .//*[${directlyEqualsText(text)}])`;

//Random
const getRandomEmail = () => `bappoe2e+${genRandomString(8)}@gmail.com`;

const getRandomBappoEmail = () => `bappoe2e+${genRandomString(8)}@bappo.com`;

module.exports = {
    genRandomString,
    directlyContainsText,
    directlyEqualsText,
    equalsText,
    getPluralizedLowercaseName,
    containsText,
    getPluralizedName,
    getRandomEmail,
    getRandomBappoEmail,
  };

//how to use it in a spec
const { getRandomEmail } = require('../utils/common');

//fixtures
cy.fixture('testUser.json').as('userData');

//SignUp
cy.doSignupUsingAPI(userEmail, this.userData);
cy.doLoginUsingAPI({
    email: userEmail,
    password: newPassword,
  });