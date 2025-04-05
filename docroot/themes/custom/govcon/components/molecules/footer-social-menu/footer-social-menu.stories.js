import footerSocialMenu from '../footer-social-menu/footer-social-menu.html.twig';
import footerSocialMenuData from '../footer-social-menu/footer-social-menu.yml';

export default {
  title: 'Molecules/Menu/Footer Social Menu',
  argTypes: {
    menu__items: { control: 'object' },
  },
};

const Template = (args) => footerSocialMenu({ items: args.menu__items });

export const FooterSocialMenu = Template.bind({});
FooterSocialMenu.args = {
  menu__items: footerSocialMenuData.menu__items,
};
