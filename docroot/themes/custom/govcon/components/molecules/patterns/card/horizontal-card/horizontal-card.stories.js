import horizontalCard from './horizontal-card.twig';

export default {
  title: "Molecules/Patterns/Blocks/Card/Horizontal Card"
}

const Card = (args) => horizontalCard(args);

export const Default = Card.bind({});
