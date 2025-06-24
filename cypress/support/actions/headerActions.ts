import { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { locators } from '../locators/elementLocators';

export class HeaderActions {

    //Verifying book a demo and home options on header
    verifyHomePageAndBookADemoOptions() {
        cy.get(locators.HEADER.homePage).should('be.visible');
        cy.get(locators.HEADER.bookADemo).contains('Book a demo').should('be.visible');
    }

    // Verifying all items available on header
    verifyHeaderNavigationOptions(dataTable: DataTable) {
        const sections = dataTable.rows().map(row => row[0]);
        sections.forEach(section => {
            cy.get(locators.HEADER.navigationOptionsHeader).should('contain.text', section);
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


}

export const headerActions = new HeaderActions();
