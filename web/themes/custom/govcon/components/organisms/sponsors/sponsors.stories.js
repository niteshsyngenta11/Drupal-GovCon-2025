import htmlComponent from './sponsors.twig';
import sponsorImage from '../../../assets/images/Default.png';
import './sponsors.scss';

export default {
  title: "Organisms/Sponsors"
};

const Component = (args) => htmlComponent(args);

export const Sponsors = Component.bind({});

Sponsors.args = {
  sponsors_page_title: "Sponsorship for",
  sponsor_sections: [
    {
      sponsor_heading: "Thanks to our 2025 Training sponsors.",
      sponsors: Array(5).fill({
        logo_url: sponsorImage,
        logo_alt: "logo",
        link: "https://www.example.com"
      })
    },
    {
      sponsor_heading: "Thanks to our 2025 Media sponsors.",
      sponsors: [
        {
          logo_url: sponsorImage,
          logo_alt: "Media sponsor logo",
          link: "https://www.example.com"
        }
      ]
    }
  ]
};
