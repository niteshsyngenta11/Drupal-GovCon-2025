import logoTemplate from './logo.twig';

import primaryLogo from '../../../assets/images/Default.png';
import secondaryLogo from '../../../assets/images/Blue.png';
import defaultLogo from '../../../logo.svg';

export default {
  title: 'Atoms/Logo',
  component: logoTemplate,
};

const Template = (args) => logoTemplate(args);

export const Primary = Template.bind({});
Primary.args = {
  src_path: primaryLogo,
  src_alt: 'Primary Logo',
};

export const Secondary = Template.bind({});
Secondary.args = {
  src_path: secondaryLogo,
  src_alt: 'Secondary Logo',
};

export const Default = Template.bind({});
Default.args = {
  src_path: defaultLogo,
  src_alt: 'Default Logo',
};
