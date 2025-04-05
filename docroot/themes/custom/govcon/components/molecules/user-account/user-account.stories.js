import userAccount from './user-account.twig';
import menuData from './user-account.yml';

export default {
  title: 'Molecules/Menu/User Account',
  argTypes: {
    menu_items: { control: 'object' },
  },
};

const Template = (args) => userAccount(args);

export const Default = Template.bind({});
Default.args = {
  menu__items: menuData.menu__items,
};
