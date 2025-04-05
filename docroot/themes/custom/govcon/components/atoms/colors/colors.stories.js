import colors from './colors.demo.twig';
import colorsData from './colors.yml';

export default {
  title: 'Atoms/Colors',
  render: ({ ...args }) => {
    return colors({ ...args });
  },
};

export const Palettes = {
  args: {
    palettes: colorsData.palettes,
  },
};
