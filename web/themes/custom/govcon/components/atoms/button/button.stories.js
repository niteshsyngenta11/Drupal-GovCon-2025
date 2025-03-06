// button.stories.js
import Button from './button.twig';
import './button.scss';
import buttonData from "./button.data.yml";

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    label: { control: 'text' },
    modifier: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    src_url: { control: 'text' },
    src_target: {
      control: 'select',
      options: ['_self', '_blank'],
    },
  },
};

const Template = (args) => Button(args);

export const Primary = Template.bind({});
export const Secondary = Template.bind({});

Primary.args = buttonData.primary;
Secondary.args = buttonData.secondary;
