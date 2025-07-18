import { DataTable, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { footerActions } from '../actions/footerActions';
import { headerActions } from '../actions/headerActions';
import { homePageActions } from '../actions/homePageActions';
import { sapFioneerActions } from '../actions/sapFioneerActions';

Given('User accesses the main page of SAP Fioneer main page and accepts cookies', () => {
  homePageActions.visitHomePage();
  homePageActions.acceptCookies();
});

Then('the homepage and book a demo options on header should be visible', () => {
  headerActions.verifyHomePageAndBookADemoOptions();
});

Then('the following navigation options on header should be available', function (dataTable: DataTable) {
  headerActions.verifyHeaderNavigationOptions(dataTable);
});

Then('the following feature blocks should be visible:', function (dataTable: DataTable) {
  homePageActions.verifyFeatureBlocks(dataTable);
});

Then('the following Financial services institutions logo', function (dataTable: DataTable) {
  homePageActions.verifyFinancialInstitutionsLogos(dataTable);
});

Then('the following E2E solutionsr financial services should be visible', function (dataTable: DataTable) {
  homePageActions.verifySolutionOptionsOnCardBlocks(dataTable);
});

Then('the following customers success stories should be visible', function (dataTable: DataTable) {
  homePageActions.verifyCustomersSuccessStories(dataTable);
});

Then('the following news & insights block should be visible', function (dataTable: DataTable) {
  homePageActions.verifyNewsInsights(dataTable);
});

Then('the following social media should be visible on footer', function (dataTable: DataTable) {
  footerActions.verifySocialMediaOptionsOnFooter(dataTable);
});

Then('the following important links should be visible on footer', function (dataTable: DataTable) {
  footerActions.verifyOptionsOnFooter(dataTable);
});

Given('user opens {string} section on header', (optionHeader: string) => {
  headerActions.selectNavigationOption(optionHeader, 'header');
});

Given('user opens {string} option on menu sidebar', (optionMenuSidebar: string) => {
  headerActions.selectNavigationOption(optionMenuSidebar, 'sidebar');
});

When('user clicks on {string} option on content panel', (optionContentPanel: string) => {
  headerActions.selectContentPanelOption(optionContentPanel);
});

Then('user should be redirected to {string} page', (redirectedURL: string) => {
  sapFioneerActions.verifyURLRedirection(redirectedURL);
});

Then('{string} description should be visible on page', (contentTitlePage: string) => {
  sapFioneerActions.verifyContentNewPage(contentTitlePage);
});

Given('user clicks {string} option available on main page', (optionMainPage: string) => {
  sapFioneerActions.clickOptionMainPage(optionMainPage);
});

Given('the user enters an incorrectly formatted email in the Work Email field', () => {
  sapFioneerActions.enterInvalidEmail('invalidFormatEmail');
});

Given('the user enters an email with a disallowed domain in the Work Email field', () => {
  sapFioneerActions.enterInvalidEmail('notAcceptedDomainEmail');
});

Then('an error message {string} should be displayed', (errorMessage: string) => {
  sapFioneerActions.verifyErrorMessageEmail(errorMessage);
});
