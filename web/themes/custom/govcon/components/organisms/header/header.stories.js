import headerTwig from './header.twig';
import './header.js';
import defaultLogo from '../../../logo.svg';
import useraccount_data from '@molecules/user-account/user-account.yml'
import mainmenu_data from '@molecules/main-menu/main-menu.yml'


export default {
  title: 'Organisms/Header',
  argTypes: {
    menu_items: { control: 'object' },
  },
};

const Template = (args) => headerTwig(args);

export const Default = Template.bind({});
Default.args = {
  src: defaultLogo,
  alt: 'Drupal GovCon Logo',
  useraccount_menu: useraccount_data.menu__items,
  menuItems: mainmenu_data.menu__items
};
