import htmlComponent from './session-archive.twig';
import pageData from './session-archive.yml';
import './session-archive.scss';

export default {
  title: "Molecules/Templates/Session archive"
}

const Component = (args) => htmlComponent(args);

export const Default = Component.bind({});

Default.args = pageData;
