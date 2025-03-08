import featuredCard from './featured-card.twig';

export default {
  title: "Molecules/Patterns/Blocks/Card/Featured Card"
}

const Card = (args) => featuredCard(args);

export const Default = Card.bind({});
