import htmlComponent from './two-column-card.twig';

export default {
  title: "Molecules/Patterns/Section/Two Columns Card"
}

const Component = (args) => htmlComponent(args);

export const Default = Component.bind({});
