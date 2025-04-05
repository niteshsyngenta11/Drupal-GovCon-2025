import viewsFilter from './views-filter.demo.twig';
import './views-filter.scss';

const storyName = 'Views filter';

export default { title: 'Molecules/Views filter' };
const Template = (args) => viewsFilter(args);

export const Default = Template.bind({});
Default.args = {
  storyName,
  viewsFilter,
};
