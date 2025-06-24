// ApplicationActions class encapsulates all user interactions and verifications on the SAP Fioneer application, centralizing test actions for better maintainability.

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

  // Verifying book a demo and home options on header
  verifyHomePageAndBookADemoOptions() {
    cy.get(locators.HEADER.homePage).should('be.visible')
    cy.get(locators.HEADER.bookADemo).contains('Book a demo').should('be.visible')
  }

  // Verifying all items available on header
  verifyHeaderNavigationOptions(dataTable: DataTable) {
    const sections = dataTable.rows().map(row => row[0]);
    sections.forEach(section => {
      cy.get(locators.HEADER.navigationOptionsHeader).should('contain.text', section);
    });
  }

  // Verifying that each stepper block can be selected by its heading and displays the correct description
  verifyFeatureBlocks(dataTable: DataTable) {
    dataTable.hashes().forEach(({ heading, description }) => {

      cy.get(locators.STEPPER_BLOCK.buttonOptions)
        .contains(heading)
        .click()  //here we click in each stepper block
        .then(() => {
          cy.get(locators.STEPPER_BLOCK.descriptionDetails)
            .should('contain.text', description) //here we verify the content (details) of the clicked stepper block
            .then(() => {
            });
        });
    });
  }

  //Verifying if the logos of institutions are available on institutions block
  verifyFinancialInstitutionsLogos(dataTable: DataTable) {
    const institutions = dataTable.rows();

    //Verifying the title of this block
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

    //Verifying the subtitle description on E2E solutions block
    cy.get(locators.CARDS_BLOCK.subTitle)
      .should('be.visible')
      .and('contain', 'End-to-end solutions for financial services');

    //Checking here if each e2e solutions exist with the name mentioned on table and checking if exist href link for each
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

    //Verifying the subtitle description on Customers Stories block
    cy.get(locators.CASE_STUDIES_BLOCK.subTitle)
      .should('be.visible')
      .and('contain', 'Customer success stories');

    //Checking here if each customers stories with the name mentioned on table and checking if exist href link for each
    solutions.forEach(([solution]) => {
      // Format the solution name to match URL slug format (lowercase, hyphens instead of spaces)
      const nameLower = solution.toLowerCase().replace(/\s+/g, '-');

      cy.get(locators.CASE_STUDIES_BLOCK.customersCasesVisible)
        .find(`a[href*="/case-studies/${nameLower}"]`)
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', `/case-studies/${nameLower}`);
    });
  }

  // Verifies that the News & Insights section displays the expected topics, descriptions, and detail buttons from the DataTable
  verifyNewsInsights(dataTable: DataTable) {
    dataTable.hashes().forEach(({ topic, description, details }) => {

      // Check if the subtitle "What’s new" is visible
      cy.get(locators.NEWS_INSIGHTS_BLOCK.subTitle)
        .should('be.visible')
        .and('contain', 'What’s new');

      // Verify each topic, description, and details button text is present
      cy.get(locators.NEWS_INSIGHTS_BLOCK.topic).contains(topic)
      cy.get(locators.NEWS_INSIGHTS_BLOCK.description).contains(description)
      cy.get(locators.NEWS_INSIGHTS_BLOCK.buttonOption).contains(details)
    });
  }

  // Verifies that each social media link in the footer has the correct aria-label as specified in the DataTable
  verifySocialMediaOptionsOnFooter(dataTable: DataTable) {
    const socialMediaList = dataTable.rows().flat(); // ["Linkedin", "Instagram", "Youtube"]

    // Check each social media item to ensure the corresponding link has the expected aria-label attribute
    socialMediaList.forEach((media) => {
      const expectedLabel = `Follow us ${media}`;

      cy.get(`${locators.FOOTER_OPTIONS.socialMedia} a[aria-label="${expectedLabel}"]`)
        .should('have.attr', 'aria-label', expectedLabel);
    });
  }

  // Loop through each row of the DataTable, extracting group names and associated site links
  verifyOptionsOnFooter(dataTable: DataTable) {
    const baseSelector = locators.FOOTER_OPTIONS.importantLinks;

    // Iterate through each row of the DataTable
    dataTable.hashes().forEach(({ groups, ['important sites']: sites }) => {
      const groupName = groups.trim();

      // For each footer group element that contains an <h4> header
      cy.get(baseSelector).filter(':has(h4)').each($el => {
        cy.wrap($el).find('h4').invoke('text').then(text => {
          // Check if the header text matches the group name from the DataTable (case-insensitive)
          if (text.trim().toLowerCase() === groupName.toLowerCase()) {
            // Convert the comma-separated string of links into an array
            const expectedLinks = sites.split(',').map(link => link.trim());

            // Verify that each expected link is visible inside the matched group element
            expectedLinks.forEach(link => {
              cy.wrap($el).contains(link).should('be.visible');
            });
          }
        });
      });
    });
  }

  // Selects a navigation option from either the header or sidebar menu, then verifies the option is active and visible
  selectNavigationOption(optionDesired: string, menuLevel: 'header' | 'sidebar') {
    const selectors = {
      header: {
        trigger: locators.HEADER.navigationOptionsHeader,
        validation: 'li.menu-item.menu-item-has-columns--active'
      },
      sidebar: {
        trigger: locators.HEADER.megaMenuSidebarOptions,
        validation: 'li.menu-section-item.menu-section-item--active'
      }
    };

    const current = selectors[menuLevel];

    cy.get(current.trigger)
      .contains(optionDesired)
      .click()
      .then(() => {
        cy.get(current.validation)
          .should('exist')
          .contains(optionDesired)
          .should('be.visible');
      });
  }

  // Clicks the desired option in the content panel based on the given parameter
  selectContentPanelOption(optionDesired: string) {
    cy.get(locators.HEADER.megaMenuContentPanel)
      .contains(optionDesired)
      .click();
  }

  // Veryfying the URL redirection based on the given url parameter
  verifyURLRedirection(urlRedirected: string) {
    cy.url().should('include', urlRedirected);
  }

  // Veryfying the content of the page based on the given content parameter 
  verifyContentNewPage(contentTitlePage: string) {
    cy.get(locators.ESG_KPI_PAGE.Tagline).contains(contentTitlePage)
  }

  // Clicks a specific button based on the given option parameter 
  clickOptionMainPage(optionMainPage: string) {
    cy.get(locators.GENERAL.buttonGetInTouchOption).eq(1)
      .contains(optionMainPage)
      .click()
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
    cy.get(locators.SALES_PAGE.errorMessage).should('be.visible')
      .contains(errorMessageGiven)
  }
}

export const applicationActions = new ApplicationActions();
