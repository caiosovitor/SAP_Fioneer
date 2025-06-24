// Step definitions linking Gherkin steps to reusable UI actions for SAP Fioneer tests.


import { DataTable, Given,When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { applicationActions } from '../actions/sapFioneerActions';


Given('User accesses the main page of SAP Fioneer main page and accepts cookies', () => {
  applicationActions.visitHomePage();
  applicationActions.acceptCookies();
});

Then('the homepage and book a demo options on header should be visible', () => {
  applicationActions.verifyHomePageAndBookADemoOptions();
});

Then('the following navigation options on header should be available', function (dataTable: DataTable) {
  applicationActions.verifyHeaderNavigationOptions(dataTable);
});

Then('the following feature blocks should be visible:', function (dataTable: DataTable) {
  applicationActions.verifyFeatureBlocks(dataTable);
});

Then('the following Financial services institutions logo', function (dataTable: DataTable) {
  applicationActions.verifyFinancialInstitutionsLogos(dataTable);
});

Then('the following E2E solutionsr financial services should be visible', function (dataTable: DataTable) {
  applicationActions.verifySolutionOptionsOnCardBlocks(dataTable);
});

Then('the following customers success stories should be visible', function (dataTable: DataTable) {
  applicationActions.verifyCustomersSuccessStories(dataTable);
});

Then('the following news & insights block should be visible', function (dataTable: DataTable) {
  applicationActions.verifyNewsInsights(dataTable);
});

Then('the following social media should be visible on footer', function (dataTable: DataTable) {
  applicationActions.verifySocialMediaOptionsOnFooter(dataTable);
});

Then('the following important links should be visible on footer', function (dataTable: DataTable) {
  applicationActions.verifyOptionsOnFooter(dataTable);
});

Given('user opens {string} section on header', (optionHeader: string) => {
  applicationActions.selectNavigationOption(optionHeader, 'header');
});

Given('user opens {string} option on menu sidebar', (optionMenuSidebar: string) => {
  applicationActions.selectNavigationOption(optionMenuSidebar, 'sidebar');
});

When('user clicks on {string} option on content panel', (optionContentPanel: string) => {
  applicationActions.selectContentPanelOption(optionContentPanel);
});

Then('user should be redirected to {string} page', (redirectedURL: string) => {
  applicationActions.verifyURLRedirection(redirectedURL);
});

Then('{string} description should be visible on page', (contentTitlePage: string) => {
  applicationActions.verifyContentNewPage(contentTitlePage);
});

Given('user clicks {string} option available on main page', (optionMainPage: string) => {
  applicationActions.clickOptionMainPage(optionMainPage);
});

Given('the user enters an incorrectly formatted email in the Work Email field', () => {
  applicationActions.enterInvalidEmail('invalidFormatEmail')
});

Given('the user enters an email with a disallowed domain in the Work Email field', () => {
  applicationActions.enterInvalidEmail('notAcceptedDomainEmail')
});

Then('an error message {string} should be displayed', (errorMessage: string) => {
  applicationActions.verifyErrorMessageEmail(errorMessage);
});