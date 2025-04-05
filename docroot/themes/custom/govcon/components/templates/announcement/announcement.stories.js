import htmlComponent from './announcement.twig';
import pageData from './announcement.yml';
import './announcement.scss';

export default {
  title: "Templates/Announcement Details"
}

const Component = (args) => htmlComponent(args);

export const Announcement = Component.bind({});

Announcement.args = pageData;
