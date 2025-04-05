import sessionArchivePage from './session-archive-listing.twig';
// Header Props
import defaultLogo from '../../../logo.svg';
import useraccount_data from '@molecules/user-account/user-account.yml';
import mainmenu_data from '@molecules/main-menu/main-menu.yml';
// Footer Props
import footerMainMenuData from '../../molecules/footer-main-menu/footer-main-menu.yml';
import footerQuickLinkMenuData from '../../molecules/footer-quick-link-menu/footer-quick-link-menu.yml';
import footerSocialMenuData from '../../molecules/footer-social-menu/footer-social-menu.yml';
import primaryLogo from '../../../assets/images/Default.png';
// Session Archive Listing Page Props
import sessionArchiveData from '@organisms/archive-session/archive-session.yml';
import '@organisms/archive-session/archive-session.scss';
import "@molecules/views-filter/views-filter.scss";
import '@molecules/listing-card/listing-card.scss';
import '@molecules/pager/pager.scss';

export default {
  title: 'Pages/Session Archive Listing Page',
  component: sessionArchivePage,
  argTypes: {
  }
};

const Template = (args) => sessionArchivePage(args);

export const Default = Template.bind({});
Default.args = {
  src: defaultLogo,
  alt: 'Drupal GovCon Logo',
  useraccount_menu: useraccount_data.menu__items,
  menuItems: mainmenu_data.menu__items,
  ...sessionArchiveData,
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
};