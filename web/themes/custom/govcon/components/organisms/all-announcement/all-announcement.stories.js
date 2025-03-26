import announcementComponent from './all-announcement.demo.twig';
import data from './all-announcement.yml';

export default {
  title: "Organisms/All Announcement",
  argTypes: {
    title: {control: "text", defaultValue: data.title},
    announcements: {
      control: "object",
      description: "List of announcements to display",
      defaultValue: data.announcements,
    },
  },
};

const Template = (args) => announcementComponent(args);

export const Default = Template.bind({});
Default.args = {
  title: data.title,
  announcements: data.announcements,
};
