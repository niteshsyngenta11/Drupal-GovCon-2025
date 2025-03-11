import announcementCard from './announcement-card.twig';
import data from './announcement-data.yml';

export default {
  title: "Molecules/Announcement Card",
  argTypes: {},
};

const Template = (args) => announcementCard(args);

export const Default = Template.bind({});
Default.args = data;
