import logoTemplate from './logo.twig';

import primaryLogo from '../../../assets/images/Default.png';
import secondaryLogo from '../../../assets/images/Blue.png';

export default {
  title: 'Atoms/Logo',
  component: logoTemplate, // Similar to the Button example
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    primary_logo: { control: 'text' },
    secondary_logo: { control: 'text' },
  },
};

const Template = (args) => logoTemplate(args); // Direct function call like your button

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  primary_logo: primaryLogo,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  secondary_logo: secondaryLogo,
};
