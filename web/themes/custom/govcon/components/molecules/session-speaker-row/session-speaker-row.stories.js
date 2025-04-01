import htmlComponent from './session-speaker-row.twig';
import './session-speaker-row.scss';
import data from './session-speaker-row-data.yml';

export default {
  title: "Molecules/Session Speaker Row"
};

const Component = (args) => htmlComponent(args);

export const Session_Speaker_Row = Component.bind({});

Session_Speaker_Row.args = data;
