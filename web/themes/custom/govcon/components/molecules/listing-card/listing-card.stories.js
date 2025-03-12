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
    fields: { control: 'object' },
  },
};

const Template = (args) => ListingCard(args);

export const Default = Template.bind({});
Default.args = data;

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  "heading": "Heading",
  "subheading": "Subheading",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "cta": {
    "url": "#",
    "title": "Button",
    "target": "_blank",
    "content": "Button"
  },
  "fields": [
    {
      "label": "Field One",
      "value": "Field one content"
    },
    {
      "label": "Field Two",
      "value": "Field two content"
    },
    {
      "label": "Field Three",
      "value": "Field three content"
    },
    {
      "label": "Field Four",
      "value": "Field Four content"
    }
  ]
};

export const WithoutFields = Template.bind({});
WithoutFields.args = {
  "image": "https://placehold.co/220x200.png",
  "image_alt": "Sample image",
  "heading": "Heading",
  "subheading": "Subheading",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "cta": {
    "url": "#",
    "title": "Button",
    "target": "_blank",
    "content": "Button"
  },
};

export const WithoutFieldsImage = Template.bind({});
WithoutFieldsImage.args = {
  "heading": "Heading",
  "subheading": "Subheading",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "cta": {
    "url": "#",
    "title": "Button",
    "target": "_blank",
    "content": "Button"
  },
};