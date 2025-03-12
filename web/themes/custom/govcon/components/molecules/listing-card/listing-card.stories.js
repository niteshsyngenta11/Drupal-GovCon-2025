import ListingCard from './listing-card.twig';
import data from './listing-card.yml';

export default {
  title: 'Molecules/Listing Card',
  component: ListingCard,
  argTypes: {
    image: { control: 'text' },
    image_alt: { control: 'text' },
    heading: { control: 'text' },
    subheading: { control: 'text' },
    description: { control: 'text' },
    fields: { control: 'object' },
  },
};

const Template = (args) => ListingCard(args);

export const Default = Template.bind({});
Default.args = data;
