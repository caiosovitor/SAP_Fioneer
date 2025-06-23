import { DataTable, Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { applicationActions } from '../actions/sapFioneerActions';
import { locators } from '../locators/elementLocators';

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









