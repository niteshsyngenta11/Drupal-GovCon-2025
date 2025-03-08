import CtaCard from './cta-card.twig';
import './cta-card.scss';

export default {
  title: 'Molecules/CTA Card',
  component: CtaCard,
  argTypes: {
    menus: { control: 'object' },
    description: { control: 'text' },
    cta_label: { control: 'text' },
    cta_url: { control: 'text' },
  }
};
const Template = (args) => CtaCard(args);
export const Default = Template.bind({});
Default.args = {
  description: "Drupal GovCon, a production of Drupal4Gov, is made possible by our wonderful sponsors and volunteers.",
  cta_label: "Become A Sponsor",
  cta_url: "#"
};
