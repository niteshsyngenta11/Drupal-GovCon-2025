import htmlComponent from './hero-text-with-card.twig';

export default {
  title: "Molecules/Patterns/Blocks/Hero Text with Card"
}

const Component = (args) => htmlComponent(args);

export const Default = Component.bind({});
