import homepage from './homepage.twig';
// Header Props
import defaultLogo from '../../../logo.svg';
import useraccount_data from '@molecules/user-account/user-account.yml';
import mainmenu_data from '@molecules/main-menu/main-menu.yml';
import './homepage.demo.scss';
// Announcement Props
import announcementData from '@molecules/patterns/featured-section/featured-section-data.yml';
// Footer Props
import footerMainMenuData from '../../molecules/footer-main-menu/footer-main-menu.yml';
import footerQuickLinkMenuData from '../../molecules/footer-quick-link-menu/footer-quick-link-menu.yml';
import footerSocialMenuData from '../../molecules/footer-social-menu/footer-social-menu.yml';
import primaryLogo from '../../../assets/images/Default.png';
import bgImage from '../../../assets/images/bg-homepage.webp';

export default {
  title: 'Pages/Homepage',
  component: homepage,
  argTypes: {
    background_image: { control: 'text' },
  }
};

const Template = (args) => homepage(args);

announcementData.viewAnnouncement.classes = ['text-light', 'h4'];

export const Default = Template.bind({});
Default.args = {
  background_image: bgImage,
  src: defaultLogo,
  alt: 'Drupal GovCon Logo',
  useraccount_menu: useraccount_data.menu__items,
  menuItems: mainmenu_data.menu__items,
  announcements: announcementData.announcements,
  allAnnouncement: announcementData.viewAnnouncement,
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