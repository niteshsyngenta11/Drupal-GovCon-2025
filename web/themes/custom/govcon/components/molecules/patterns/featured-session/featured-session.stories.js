import htmlComponent from './featured-session.twig';

export default {
  title: "Molecules/Patterns/Section/Featured Session"
}

const Component = (args) => htmlComponent(args);

export const Default = Component.bind({});
