import footerMainMenu from '../footer-main-menu/footer-main-menu.html.twig';
import footerMainMenuData from '../footer-main-menu/footer-main-menu.yml';

export default {
  title: 'Molecules/Menu/Footer Main Menu',
  argTypes: {
    menu__items: { control: 'object' },
  },
};

const Template = (args) => footerMainMenu({ items: args.menu__items });

export const FooterMainMenu = Template.bind({});
FooterMainMenu.args = {
  menu__items: footerMainMenuData.menu__items,
};
