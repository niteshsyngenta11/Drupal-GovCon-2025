import logoTemplate from './logo.twig';
import defaultLogo from '../../../logo.svg';

export default {
  title: 'Atoms/Logo',
  component: logoTemplate,
};

const Template = (args) => logoTemplate(args);

export const Primary = Template.bind({});
Primary.args = {
  storybook: true,
  logo_type: "primary",
  src_alt: 'Primary Logo',
};

export const Secondary = Template.bind({});
Secondary.args = {
  storybook: true,
  logo_type: "secondary",
  src_alt: 'Secondary Logo',
};

export const Default = Template.bind({});
Default.args = {
  src_path: defaultLogo,
  src_alt: 'Default Logo',
};
