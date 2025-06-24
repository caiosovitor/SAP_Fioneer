import { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { locators } from '../locators/elementLocators';

export class FooterActions {

    // Verifies that each social media link in the footer has the correct aria-label as specified in the DataTable
    verifySocialMediaOptionsOnFooter(dataTable: DataTable) {
        const socialMediaList = dataTable.rows().flat(); // ["Linkedin", "Instagram", "Youtube"]

        //Check each social media item to ensure the corresponding link has the expected aria-label attribute
        socialMediaList.forEach((media) => {
            const expectedLabel = `Follow us ${media}`;
            cy.get(locators.FOOTER_OPTIONS.socialMedia(media))
                .should('have.attr', 'aria-label', expectedLabel);
        });
    }

    // Loop through each row of the DataTable, extracting group names and associated site links
    verifyOptionsOnFooter(dataTable: DataTable) {

        // Iterate through each row of the DataTable
        const baseSelector = locators.FOOTER_OPTIONS.importantLinks;
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

}

export const footerActions = new FooterActions();
