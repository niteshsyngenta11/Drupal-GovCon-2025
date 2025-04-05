import htmlComponent from './session-speaker.twig';
import './session-speaker.scss';
import data from './session-speaker-data.yml';

export default {
  title: "Organisms/Session Speaker"
};

const Component = (args) => htmlComponent(args);

export const Session_Speaker = Component.bind({});

Session_Speaker.args = data;
