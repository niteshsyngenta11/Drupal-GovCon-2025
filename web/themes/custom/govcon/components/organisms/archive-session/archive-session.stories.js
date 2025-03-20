import ArchiveSession from './archive-session.demo.twig';
import data from './archive-session.yml';
import './archive-session.scss';
import "@molecules/views-filter/views-filter.scss";
import '@molecules/listing-card/listing-card.scss';
import '@molecules/pager/pager.scss';

export default {
  title: 'Organisms/Archive Session',
  component: ArchiveSession,
};

const Template = (args) => ArchiveSession(args);

export const Default = Template.bind({});
Default.args = data;
