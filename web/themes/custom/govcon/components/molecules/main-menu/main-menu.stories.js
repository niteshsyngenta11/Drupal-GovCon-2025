import menuTwig from './main-menu.twig';
import menuData from './main-menu.yml';
import './main-menu.scss';

export default {
  title: 'Molecules/Menu/Main Menu',
  argTypes: {
    menu_items: { control: 'object' },
  },
};

const Template = (args) => menuTwig(args);

export const Default = Template.bind({});
Default.args = {
  menu__items: menuData.menu__items,
};
