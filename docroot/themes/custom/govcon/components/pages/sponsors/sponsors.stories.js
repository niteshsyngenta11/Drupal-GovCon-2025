import sponsorsPage from './sponsors.twig';
// Header Props
import defaultLogo from '../../../logo.svg';
import useraccount_data from '@molecules/user-account/user-account.yml';
import mainmenu_data from '@molecules/main-menu/main-menu.yml';
// Footer Props
import footerMainMenuData from '../../molecules/footer-main-menu/footer-main-menu.yml';
import footerQuickLinkMenuData from '../../molecules/footer-quick-link-menu/footer-quick-link-menu.yml';
import footerSocialMenuData from '../../molecules/footer-social-menu/footer-social-menu.yml';
import primaryLogo from '../../../assets/images/Default.png';
// Sponsor Props
import sponsorImage from '../../../assets/images/Default.png';
import '@organisms/sponsors/sponsors.scss';



export default {
  title: 'Pages/Sponsors',
  component: sponsorsPage,
  argTypes: {
  }
};

const Template = (args) => sponsorsPage(args);

export const Default = Template.bind({});
Default.args = {
  src: defaultLogo,
  alt: 'Drupal GovCon Logo',
  useraccount_menu: useraccount_data.menu__items,
  menuItems: mainmenu_data.menu__items,
  footer_data: {
    src_path: primaryLogo,
    src_alt: 'Dummy Logo',
    footer_description: 'Drupal GovCon, a production of Drupal4Gov, is made possible by our wonderful sponsors and volunteers.',
    footer_cta_url: '#',
    footer_cta_label: 'Become A Sponsor',
  },
  footer_main_menu: footerMainMenuData.menu__items,
  footer_quick_link_menu: footerQuickLinkMenuData.menu__items,
  footer_social_menu: footerSocialMenuData.menu__items,
  sponsors_page_title: "Sponsorship for",
  sponsor_sections: [
    {
      sponsor_heading: "Thanks to our 2025 Training sponsors.",
      sponsors: Array(5).fill({
        logo_url: sponsorImage,
        logo_alt: "logo",
        link: "https://www.example.com"
      })
    },
    {
      sponsor_heading: "Thanks to our 2025 Media sponsors.",
      sponsors: [
        {
          logo_url: sponsorImage,
          logo_alt: "Media sponsor logo",
          link: "https://www.example.com"
        }
      ]
    }
  ]
};