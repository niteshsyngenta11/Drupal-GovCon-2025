import CreateIcons from './icons.twig';
import iconsData from './icons.json';

export default {
  title: 'Atoms/Icon',
  render: ({ ...args }) => {
    return CreateIcons({ ...args });
  },
  argTypes: {
    icons: { control: 'object' },
  }
};

export const icon = {
  args: {
    icons: iconsData.icons,
  },
};
