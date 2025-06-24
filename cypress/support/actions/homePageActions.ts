import { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { locators } from '../locators/elementLocators';

export class HomePageActions {

    // Navigates to the homepage and sets viewport to Full HD resolution
    visitHomePage() {
        cy.visit('/');
        cy.viewport(1920, 1080);

        //Ignore uncaught exceptions in the application to prevent test failures
        Cypress.on('uncaught:exception', () => false);
    }

    // Accepts the cookie consent banner if it's visible
    acceptCookies() {
        cy.get(locators.GENERAL.cookieConsent).should('be.visible').then(() => {
            cy.get(locators.GENERAL.cookieConsent).click();
        });
    }

    // Verifying that each stepper block can be selected by its heading and displays the correct description
    verifyFeatureBlocks(dataTable: DataTable) {
        dataTable.hashes().forEach(({ heading, description }) => {
            cy.get(locators.STEPPER_BLOCK.buttonOptions)
                .contains(heading)
                .click()
                .then(() => {
                    cy.get(locators.STEPPER_BLOCK.descriptionDetails)
                        .should('contain.text', description);
                });
        });
    }

    //Verifying if the logos of institutions are available on institutions block
    verifyFinancialInstitutionsLogos(dataTable: DataTable) {
        const institutions = dataTable.rows();
        cy.get(locators.LOGOS_BLOCK.subTitle)
            .contains('Trusted by leading financial services institutions around the globe');
        institutions.forEach(([institution]) => {
            const nameLower = institution.toLowerCase().replace(/\s+/g, '-');
            cy.get(locators.LOGOS_BLOCK.logos(nameLower))
                .should('be.visible');
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
            cy.get(locators.NEWS_INSIGHTS_BLOCK.topic).contains(topic);
            cy.get(locators.NEWS_INSIGHTS_BLOCK.description).contains(description);
            cy.get(locators.NEWS_INSIGHTS_BLOCK.buttonOption).contains(details);
        });
    }
}

export const homePageActions = new HomePageActions();
