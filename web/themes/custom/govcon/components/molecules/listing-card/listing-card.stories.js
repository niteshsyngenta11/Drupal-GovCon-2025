import ListingCard from './listing-card.twig';
import data from './listing-card.yml';
import './listing-card.scss';

export default {
  title: 'Molecules/Listing Card',
  component: ListingCard,
  argTypes: {
    image: { control: 'text' },
    image_alt: { control: 'text' },
    heading: { control: 'text' },
    subheading: { control: 'text' },
    description: { control: 'text' },
    session_track: { control: 'text', defaultValue: 'Site Building and Using Drupal' },
    technical_level: { control: 'text', defaultValue: 'Beginner' },
    conference_year: { control: 'text', defaultValue: '2021' },
    presenters: { control: 'text', defaultValue: 'pixelite, jcloys' },
  },
};

const Template = (args) => ListingCard(args);

export const Default = Template.bind({});
Default.args = data;

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  ...data,
  image: null,
};

export const WithoutFields = Template.bind({});
WithoutFields.args = {
  ...data,
  session_track: null,
  technical_level: null,
  conference_year: null,
  presenters: null,
};
