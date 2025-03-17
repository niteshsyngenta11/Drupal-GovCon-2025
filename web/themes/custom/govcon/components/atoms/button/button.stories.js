// button.stories.js
import Button from './button.twig';
import buttonData from "./button.data.yml";

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    modifier: {
      control: 'select',
      options: ['primary', 'secondary', 'button-with-icon icon--arrow-right icon-after'],
    },
  },
};

const Template = (args) => Button(args);

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const ButtonWithIcon = Template.bind({});

Primary.args = buttonData.primary;
Secondary.args = buttonData.secondary;
ButtonWithIcon.args = buttonData.button_with_icon
