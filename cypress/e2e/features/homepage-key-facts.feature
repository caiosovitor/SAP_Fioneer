Feature: Key Facts validation on SAP Fioneer homepage

    This feature focuses on validating the key UI elements and informational blocks
    present on the main page of SAP Fioneer. It includes verification of:
    - Header navigation and CTA buttons
    - Key fact blocks below the main banner
    - Logos of financial institutions
    - E2E solutions section
    - Customer success stories
    - News & Insights tiles
    - Footer social links and grouped links


    Background:
        Given User accesses the main page of SAP Fioneer main page and accepts cookies



    Scenario: 1 - Veryfing Key Sections available on header of page
        Then the homepage and book a demo options on header should be visible
        And the following navigation options on header should be available
            | sections  |
            | Products  |
            | Solutions |
            | Resource  |
            | Company   |


    #below "Innovate with a trusted partner on your side" subtitle
    Scenario: 2 - Veryfing Key Sections available on stepper blocks
        Then the following feature blocks should be visible:
            | heading                    | description                                                                                                                |
            | The best of both worlds    | We combine the agility of a start-up with the experience of a best-in-class software company.                              |
            | Lean, future-fit and fast  | Accelerate time to market and reduce complexity through lean architecture, open APIs and a composable approach.            |
            | From vendor to partner     | Don’t settle for off-the-shelf products. We listen to your specific needs, collaborate closely and invest in your success. |
            | A safe pair of hands       | We have decades of experience of successful digital transformation, never compromising reliability and scalability.        |
            | At your side at every step | We are a global player with teams on the ground to offer a seamless journey wherever you operate.                          |


    Scenario: 3 - Veryfing Financial Services Institutes logo
        Then the following Financial services institutions logo
            | institutions         |
            | Galicia              |
            | Raiffeisenlandesbank |
            | HDI                  |
            | Tokio Marine Nichido |
            | ERST                 |
            | ERGO                 |
            | SHB                  |
            | ATB                  |

    Scenario: 4 - Veryfing solutions available on cards blocks area
        And the following E2E solutionsr financial services should be visible
            | solutions   |
            | Banking     |
            | Insurance   |
            | Finance ESG |

    ##Veryfing only customers success stories available on main page, without click in "More customer stories"
    Scenario: 5 - Veryfing customers success stories on case studies block
        And the following customers success stories should be visible
            | customers storiers   |
            | HASI                 |
            | Raiffeisenlandesbank |
            | Avenue Bank          |
            | in1bank              |
            | Ergo                 |
            | Banco Atlantida      |

    #Veryfing Key Sections available on News and Insights on tiles block
    Scenario: 6 - Veryfing News and Insights on tiles block
        And the following news & insights block should be visible
            | topic                             | description                                                                                                                | details     |
            | The SAP Fioneer AI Agent is here  | Learn about the SAP Fioneer AI Agent, and how it can help you turn AI into a usable, scalable advantage for your business. | Learn more  |
            | ILB to use SAP Fioneer technology | We’ve partnered with Investitionsbank des Landes Brandenburg (ILB) to develop a platform for development banks.            | Learn more  |
            | The modernization dividend        | Modernizing core insurance systems represents far more than a technical upgrade; it’s a strategic investment.              | Read more   |
            | The new role of bank CFOs         | The role of the CFO is undergoing a profound transformation that Artificial Intelligence is helping to shape.              | Read more   |
            | Get the latest insights           | Sign up for our newsletter and get the latest business insights and thought leadership delivered straight to your inbox.   | Sign up now |


    Scenario: 7- Veryfing Sections available on Footer of the page
        Then the following social media should be visible on footer
            | social media |
            | Linkedin     |
            | Instagram    |
            | Youtube      |
        And the following important links should be visible on footer
            | groups      | important sites                                                                                                      |
            | quick links | Customer support, Partners, Technology, Co-innovation, Services, Contact                                             |
            | trending    | Core Banking, Cash Management, Finance Platform, AI Agent, Life & Pension Insurance, P&C Insurance, Credit Workplace |
            | company     | Customer stories, Blog articles, Whitepapers, Events and webinars, About us, News and Media, Careers, Newsletter     |
            | legal       | Privacy Terms, Cookie preferences, Imprint, Documents, Reporting tool                                                |

