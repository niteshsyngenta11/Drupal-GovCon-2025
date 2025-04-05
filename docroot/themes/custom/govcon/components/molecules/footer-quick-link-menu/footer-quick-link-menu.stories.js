import footerQuickLinkMenu from '../footer-quick-link-menu/footer-quick-link-menu.html.twig';
import footerQuickLinkMenuData from '../footer-quick-link-menu/footer-quick-link-menu.yml';

export default {
  title: 'Molecules/Menu/Footer Quick Link Menu',
  argTypes: {
    menu__items: { control: 'object' },
  },
};

const Template = (args) => footerQuickLinkMenu({ items: args.menu__items });

export const FooterQuickLinkMenu = Template.bind({});
FooterQuickLinkMenu.args = {
  menu__items: footerQuickLinkMenuData.menu__items,
};
