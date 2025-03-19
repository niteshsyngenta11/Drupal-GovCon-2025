import htmlComponent from './sponsor-listing.twig';
import sponsorImage from '../../../assets/images/Default.png';
import './sponsor-listing.scss';

export default {
  title: "Molecules/Sponsor Listing"
};

const Component = (args) => htmlComponent(args);

export const Sponsor_listing = Component.bind({});

Sponsor_listing.args = {
  sponsor_heading: "Thanks to our 2025 Training sponsors.",
  sponsors: Array(5).fill({ 
    logo_url: sponsorImage,
    logo_alt: "Training Sponsor Logo",
    link: "https://www.example.com" 
  })
};
