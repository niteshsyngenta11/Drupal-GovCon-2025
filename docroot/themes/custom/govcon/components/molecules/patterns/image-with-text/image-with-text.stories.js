import htmlComponent from './image-with-text.twig';

export default {
  title: "Molecules/Patterns/Blocks/Image With Text"
}

const Component = (args) => htmlComponent(args);

export const Default = Component.bind({});
