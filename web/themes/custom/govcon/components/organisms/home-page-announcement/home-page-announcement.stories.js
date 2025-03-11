import announcementComponent from './home-page-announcement-demo.twig';
import data from './announcement-data.yml';

export default {
  title: "Organisms/Homepage Announcement",
  argTypes: {
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
  announcements: data.announcements,
};
