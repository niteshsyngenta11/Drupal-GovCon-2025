import pager from './pager.demo.twig';
import './pager.scss';

export default {
  title: 'Molecules/Pager',
  argTypes: {
    pager__uid: { control: 'number', defaultValue: 0 },
    current: { control: 'number', defaultValue: 1 },
    max_page: { control: 'number', defaultValue: 11 }, // Added max_page control
    items: {
      control: 'object',
      defaultValue: {
        pages: Array.from({ length: 11 }, (_, i) => ({
          href: `#`,
          attributes: '',
        })),
      },
    },
  },
};

const Template = (args) => pager(args);

export const Basic = Template.bind({});
Basic.args = {
  pager__uid: 0,
  current: 1,
  items: {
    pages: Array.from({ length: 11 }, (_, i) => ({
      href: `#`,
      attributes: '',
    })),
  },
};
