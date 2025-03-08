import heroImage from './hero-image.twig';

export default {
  title: "Molecules/Patterns/Blocks/Hero Image"
}

const Card = (args) => heroImage(args);

export const Default = Card.bind({});
