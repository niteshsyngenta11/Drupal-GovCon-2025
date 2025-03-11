import announcementCard from './announcement-card.twig';
import data from './announcement-data.yml';

export default {
  title: "Molecules/Announcement Card"
};

const Card = () => announcementCard(data);

export const Default = Card.bind({});
