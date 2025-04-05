import verticleCard from './vertical-card.twig';

export default {
  title: "Molecules/Patterns/Blocks/Card/Verticle Card"
}

const Card = (args) => verticleCard(args);

export const Default = Card.bind({});
