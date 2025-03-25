import htmlComponent from './featured-section.twig';
import data from './featured-section-data.yml';
import '@atoms/button/button.scss';

export default {
  title: "Molecules/Patterns/Section/Featured Section"
}

const Component = (args) => htmlComponent(args);

export const Default = Component.bind({});
Default.args = {
  announcements: data.announcements,
  allAnnouncement: data.viewAnnouncement
};
