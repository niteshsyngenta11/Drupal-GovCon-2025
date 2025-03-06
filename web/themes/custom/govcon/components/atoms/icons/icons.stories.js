import CreateIcons from './icons.twig';
import iconsData from './icons.json';

export default {
  title: 'Atoms/Icons',
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
