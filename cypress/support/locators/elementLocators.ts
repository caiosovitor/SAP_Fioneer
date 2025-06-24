
// Note: Locators are used to centralize element selectors, so if any element changes, only the locator file needs updating, keeping tests functional.
// Also, implementing data-test attributes in the frontend would improve test stability and reduce flakiness.


export interface Locators {
  GENERAL: {
    cookieConsent: string;
    buttonGetInTouchOption: string;
  };
  HEADER: {
    homePage: string;
    bookADemo: string;
    navigationOptionsHeader: string;
    megaMenuSidebarOptions: string;
    megaMenuContentPanel: string;
  };
  STEPPER_BLOCK: {
    buttonOptions: string;
    descriptionDetails: string;
  };
  LOGOS_BLOCK: {
    subTitle: string;
    logos: (nameLower: string) => string;
  };
  CARDS_BLOCK: {
    subTitle: string;
    cardsOptions: string;
  };
  CASE_STUDIES_BLOCK: {
    subTitle: string;
    customersCasesVisible: string;
  };
  NEWS_INSIGHTS_BLOCK: {
    subTitle: string;
    topic: string;
    description: string;
    buttonOption: string;
  };
  FOOTER_OPTIONS: {
    socialMedia: string;
    importantLinks: string;
  };
  ESG_KPI_PAGE: {
    Tagline: string;
  }
  SALES_PAGE: {
    workEmail: string;
    errorMessage: string;
  }
}

export const locators: Locators = {
  GENERAL: {
    cookieConsent: '.cky-consent-container .cky-notice .cky-btn-accept',
    buttonGetInTouchOption: '.main .btn--yellow'
  },
  HEADER: {
    homePage: `header.header a[aria-label="Homepage"]`,
    bookADemo: `header.header span[class='d-flex']`,
    navigationOptionsHeader: `#menu-walker .menu-item__link`, //Here I'm limitating to verify only buttons available on headers when I specify "#menu-walker button.menu-item__link"
    megaMenuSidebarOptions: `#menu-walker .menu-section-item button`,
    megaMenuContentPanel: `.walker__columns--active a`
  },
  STEPPER_BLOCK: {
    buttonOptions: '.stepper-block__text button',
    descriptionDetails: '.stepper-block__text p'
  },
  LOGOS_BLOCK: {
    subTitle: '.logos-block .text-center p',
    logos: (nameLower) => `img[src*="-${nameLower}"]`
  },
  CARDS_BLOCK: {
    subTitle: '.cards-block h2',
    cardsOptions: '.cards-block'
  },
  CASE_STUDIES_BLOCK: {
    subTitle: '.case-studies-block .justify-content-between',
    customersCasesVisible: '.case-studies-block .glide__slides--visible'
  },
  NEWS_INSIGHTS_BLOCK: {
    subTitle: '.tiles-block',
    topic: '.tiles-block  h3',
    description: '.tiles-block  p',
    buttonOption: '.tiles-block  .btn'
  },
  FOOTER_OPTIONS: {
    socialMedia: '.footer .col-lg-4 .list-reset',
    importantLinks: '.footer .container-fluid .col-sm-3'
  },
  ESG_KPI_PAGE: {
    Tagline: '.main h1',
  },
  SALES_PAGE: {
    workEmail: '.hs-email .input',
    errorMessage: '.hs-email .hs-error-msgs label'
  }
};




