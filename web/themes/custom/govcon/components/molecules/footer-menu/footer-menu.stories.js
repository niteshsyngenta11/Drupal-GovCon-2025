import footerSocialMenu from '../footer-social-menu/footer-social-menu.html.twig';
import footerQuickLinkMenu from '../footer-quick-link-menu/footer-quick-link-menu.html.twig';
import footerMainMenu from '../footer-main-menu/footer-main-menu.html.twig';
import footerSocialMenuData from '../footer-social-menu/footer-social-menu.yml';
import footerQuickLinkMenuData from '../footer-quick-link-menu/footer-quick-link-menu.yml';
import footerMainMenuData from '../footer-main-menu/footer-main-menu.yml';

export default {
  title: 'Molecules/Menu',
};


export const FooterMainMenu = () => {
  return footerMainMenu({ items: footerMainMenuData.menu__items });
};

export const FooterQuickLinkMenu = () => {
  return footerQuickLinkMenu({ items: footerQuickLinkMenuData.menu__items });
};

export const FooterSocialMenu = () => {
  return footerSocialMenu({ items: footerSocialMenuData.menu__items });
};
