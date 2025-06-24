import { locators } from '../locators/elementLocators';

export class SapFioneerActions {

  // Clicks a specific button based on the given option parameter 
  clickOptionMainPage(optionMainPage: string) {
    cy.get(locators.GENERAL.buttonGetInTouchOption).eq(1)
      .contains(optionMainPage)
      .click();
  }

  // Inserts different types of invalid emails based on the passed parameter, using fixture data for easy maintenance and reuse
  enterInvalidEmail(emailType: 'invalidFormatEmail' | 'notAcceptedDomainEmail') {
    cy.fixture('userData.json').then((user) => {
      const email = user[emailType];
      cy.get(locators.SALES_PAGE.workEmail)
        .type('{selectall}{backspace}') //Deletes the first value before the second invalid email input.
        .type(email, { delay: 50 });
    });
  }

  //veryfying if error message is visible and content below work email field
  verifyErrorMessageEmail(errorMessageGiven: string) {
    cy.get(locators.SALES_PAGE.errorMessage)
      .should('be.visible')
      .contains(errorMessageGiven);
  }

  // Veryfying the URL redirection based on the given url parameter
  verifyURLRedirection(urlRedirected: string) {
    cy.url().should('include', urlRedirected);
  }

  // Veryfying the content of the page based on the given content parameter 
  verifyContentNewPage(contentTitlePage: string) {
    cy.get(locators.ESG_KPI_PAGE.Tagline).contains(contentTitlePage);
  }
}

export const sapFioneerActions = new SapFioneerActions();
