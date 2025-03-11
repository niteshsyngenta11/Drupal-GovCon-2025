import htmlComponent from './session-archive.twig';
import pageData from './session-archive.yml';
import './session-archive.scss';

export default {
  title: "Molecules/Templates/Session archive Details"
}

const Component = (args) => htmlComponent(args);

export const Session_Archive = Component.bind({});

Session_Archive.args = pageData;
