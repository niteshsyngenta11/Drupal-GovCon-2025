import CreateLink from './link.demo.twig';

export default {
  title: 'Atoms/Link',
  render: ({ ...args }) => {
    return CreateLink({ ...args });
  },
  argTypes: {
    link_url: { control: 'file' },
    link_target: { control: 'text' },
    link_title: { control: 'text' },
    link_content: { control: 'text' },
    link_classes: { control: 'text' },
  }
};

export const Link = {
  args: {
    link_url: '#',
    link_title: 'Click Here',
    link_target: '_blank',
    link_content: 'Click Here',
    link_classes: '',
  },
};
