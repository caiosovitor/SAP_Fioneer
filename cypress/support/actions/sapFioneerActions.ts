
import { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { locators } from '../locators/elementLocators';

// Class responsible for handling actions on the SAP Fioneer main page
export class ApplicationActions {

  // Navigates to the homepage and sets viewport to Full HD resolution
  visitHomePage() {
    cy.visit('/'); // Base URL configured in cypress.config.ts
    cy.viewport(1920, 1080); // Sets the browser window size to 1920x1080 (Full HD), common for desktop tests

    // Ignore uncaught exceptions in the application to prevent test failures
    Cypress.on('uncaught:exception', () => false);
  }

  // Accepts the cookie consent banner if it's visible
  acceptCookies() {
    cy.get(locators.GENERAL.cookieConsent).should('be.visible').then(() => {
      cy.get(locators.GENERAL.cookieConsent).click(); // Clicks the accept button
    });
  }

  verifyHomePageAndBookADemoOptions() {
    cy.get(locators.HEADER.homePage).should('be.visible')
    cy.get(locators.HEADER.bookADemo).contains('Book a demo').should('be.visible')

  }

  verifyHeaderNavigationOptions(dataTable: DataTable) {
    const sections = dataTable.rows().map(row => row[0]);
    sections.forEach(section => {
      cy.get(locators.HEADER.navigationOptionsHeader).should('contain.text', section);
    });
  }

  verifyFeatureBlocks(dataTable: DataTable) {
    dataTable.hashes().forEach(({ heading, description }) => {

      cy.get(locators.STEPPER_BLOCK.buttonOptions)
        .contains(heading)
        .click()
        .then(() => {
          cy.get(locators.STEPPER_BLOCK.descriptionDetails)
            .should('contain.text', description)
            .then(() => {
            });
        });
    });
  }
  verifyFinancialInstitutionsLogos(dataTable: DataTable) {
    const institutions = dataTable.rows();

    cy.get(locators.LOGOS_BLOCK.subTitle).contains('Trusted by leading financial services institutions around the globe')
    institutions.forEach(([institution]) => {
      const nameLower = institution.toLowerCase().replace(/\s+/g, '-');

      cy.get(locators.LOGOS_BLOCK.logos(nameLower))
        .should('be.visible')
        .then(() => {
        });
    });
  }

  verifySolutionOptionsOnCardBlocks(dataTable: DataTable) {
    const solutions = dataTable.rows();

    //Verifying the subtitle description
    cy.get(locators.CARDS_BLOCK.subTitle)
      .should('be.visible')
      .and('contain', 'End-to-end solutions for financial services');

    //Checking here if each cars exist with the name mentioned on table and checking if exist href link for each card option
    solutions.forEach(([solution]) => {
      const nameLower = solution.toLowerCase().replace(/\s+/g, '-');

      cy.get(locators.CARDS_BLOCK.cardsOptions)
        .find(`a[href*=".com/${nameLower}"]`)
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', `.com/${nameLower}`);
    });
  }
  verifyCustomersSuccessStories(dataTable: DataTable) {
    const solutions = dataTable.rows();

    //Verifying the subtitle description
    cy.get(locators.CASE_STUDIES_BLOCK.subTitle)
      .should('be.visible')
      .and('contain', 'Customer success stories');

    //Checking here if each cars exist with the name mentioned on table and checking if exist href link for each card option
    solutions.forEach(([solution]) => {
      const nameLower = solution.toLowerCase().replace(/\s+/g, '-');

      cy.get(locators.CASE_STUDIES_BLOCK.customersCasesVisible)
        .find(`a[href*="/case-studies/${nameLower}"]`)
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', `/case-studies/${nameLower}`);
    });
  }

  verifyNewsInsights(dataTable: DataTable) {
    dataTable.hashes().forEach(({ topic, description, details }) => {

      cy.get(locators.NEWS_INSIGHTS_BLOCK.subTitle)
        .should('be.visible')
        .and('contain', 'What’s new');

      cy.get(locators.NEWS_INSIGHTS_BLOCK.topic).contains(topic)
      cy.get(locators.NEWS_INSIGHTS_BLOCK.description).contains(description)
      cy.get(locators.NEWS_INSIGHTS_BLOCK.buttonOption).contains(details)

    });

  }
  verifySocialMediaOptionsOnFooter(dataTable: DataTable) {
    const socialMediaList = dataTable.rows().flat(); // ["Linkedin", "Instagram", "Youtube"]

    socialMediaList.forEach((media) => {
      const expectedLabel = `Follow us ${media}`;

      cy.get(`${locators.FOOTER_OPTIONS.socialMedia} a[aria-label="${expectedLabel}"]`)
        .should('have.attr', 'aria-label', expectedLabel);
    });
  }

  verifyOptionsOnFooter(dataTable: DataTable) {
    const baseSelector = locators.FOOTER_OPTIONS.importantLinks;

    // Iterate through each row of the DataTable
    dataTable.hashes().forEach(({ groups, ['important sites']: sites }) => {
      const groupName = groups.trim();

      cy.get(baseSelector).filter(':has(h4)').each($el => {
        cy.wrap($el).find('h4').invoke('text').then(text => {
          // Compare the text with the group name from the table (case insensitive)
          if (text.trim().toLowerCase() === groupName.toLowerCase()) {
            // Split the comma-separated string into an array of expected links
            const expectedLinks = sites.split(',').map(link => link.trim());

            // Assert that each expected link text is visible within the matched block
            expectedLinks.forEach(link => {
              cy.wrap($el).contains(link).should('be.visible');
            });
          }
        });
      });
    });
  }


}


export const applicationActions = new ApplicationActions();
