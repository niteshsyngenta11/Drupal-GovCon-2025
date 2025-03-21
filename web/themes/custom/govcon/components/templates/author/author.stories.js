import htmlComponent from './author.twig';
import './author.scss';
import authorImage from '../../../assets/images/Default.png';

export default {
  title: "Templates/Author Details"
};

const Component = (args) => htmlComponent(args);

export const Author = Component.bind({});

Author.args = {
  author_page_title: {
    value: "Saha"
  },
  author_name: {
    label: "Name",
    first_name: "Anwesha",
    last_name: "Saha"
  },
  author_image_demo: {
    value: authorImage,
  },
  author_job_title: {
    label: "Job Title",
    value: "Jr Web Developer"
  },
  author_bio: {
    value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  author_site_link: {
    label: "Website",
    value: "Google",
    href: "http://www.google.com"
  }
};
