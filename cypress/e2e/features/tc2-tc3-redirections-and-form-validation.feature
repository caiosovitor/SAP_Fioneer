# This tag helps to easily pick and run this feature when needed (headless or browser)
@TC2AndTC3 
Feature: Navigation and Contact Form Functionality

    This feature includes the implementation of Test Case 2 and Test Case 3, covering the following validations:

    - Test Case 2 (TC2):
        - Verify that the user is correctly redirected to the "ESG KPI Engine" page after clicking the option under the "Finance & ESG" bookmark

    - Test Case 3 (TC3):
        - Verify the frontend behavior when submitting an invalid email in the contact form.
        - Note: The main page contains two "Get in touch" buttons. This test uses the first button closer "Watch demos" button.
        - Note: The second scenario TC3B of this Test Case is expected to fail due to an incorrect URL provided after clicking "Get in touch".


    #Background is used when a step is used by all the test scenarios.
    Background:
        Given User accesses the main page of SAP Fioneer main page and accepts cookies

    Scenario: TC2 - Access ESG KPI Engine via Finance & ESG bookmark and verify URL redirection
        Given user opens 'Products' section on header
        And user opens 'Finance & ESG' option on menu sidebar
        When user clicks on 'ESG KPI Engine' option on content panel
        Then user should be redirected to 'finance-esg/esg-kpi-engine/' page
        And 'Master ESG KPI management' description should be visible on page



    Scenario: TC3A - Verify frontend behavior when submitting an invalid email in the contact form
        Given user clicks 'Get in touch' option available on main page
        When the user enters an incorrectly formatted email in the Work Email field
        Then an error message 'Email must be formatted correctly' should be displayed
        When the user enters an email with a disallowed domain in the Work Email field
        Then an error message 'Please enter a different email address. This form does not accept addresses from gmail.com.' should be displayed



    # This test is expected to fail intentionally due to a known issue with the provided URL.
    Scenario: TC3B - Validate URL redirection after clicking "Get in touch" button
        Given user clicks 'Get in touch' option available on main page
        Then user should be redirected to '/contact/' page


