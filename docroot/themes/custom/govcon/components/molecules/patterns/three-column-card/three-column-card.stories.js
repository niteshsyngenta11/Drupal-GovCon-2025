import htmlComponent from './three-column-card.twig';

export default {
  title: "Molecules/Patterns/Section/Three Columns Card"
}

const Component = (args) => htmlComponent(args);

export const Default = Component.bind({});
