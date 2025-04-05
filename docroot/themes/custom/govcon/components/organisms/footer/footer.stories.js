import footerTwig from './footer.twig';
import footerMainMenuData from '../../molecules/footer-main-menu/footer-main-menu.yml';
import footerQuickLinkMenuData from '../../molecules/footer-quick-link-menu/footer-quick-link-menu.yml';
import footerSocialMenuData from '../../molecules/footer-social-menu/footer-social-menu.yml';
import primaryLogo from '../../../assets/images/Default.png';

export default {
  title: 'Organisms/Footer',
};

const Template = (args) => footerTwig(args);

export const Default = Template.bind({});
Default.args = {
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
