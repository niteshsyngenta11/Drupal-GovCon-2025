/** @type { import('@storybook/html').Preview } */
// import Twig from "twig";
// import { setupTwig } from "./setupTwig";

// Add style to storybook.
import '../components/style.scss';
import '../components/style-storybook.scss';

// setupTwig(Twig);

// Add viewports for our example device widths.
const deviceViewports = {
  phone: {
    name: 'Phone',
    styles: {
      width: '390px',
      height: '844px',
    },
  },
  phoneLarge: {
    name: 'Large Phone',
    styles: {
      width: '428px',
      height: '926px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  tabletLarge: {
    name: 'Large Tablet',
    styles: {
      width: '1024px',
      height: '1366px',
    },
  },
  desktop: {
    name: 'Desktop 1200',
    styles: {
      width: '1200px',
      height: '1024px',
    },
  },
  desktopWide: {
    name: 'Desktop 1440',
    styles: {
      width: '1440px',
      height: '1024px',
    },
  },
  desktopUltraWide: {
    name: 'Desktop 1600',
    styles: {
      width: '1600px',
      height: '1024px',
    },
  },
};

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages', '*'],
      },
    },
    viewport: {
      viewports: deviceViewports,
    },
    docs: {
      toc: true,
    },
    layout: 'fullscreen',

    a11y: {
      config: {
        rules: [
          { id: 'frame-tested', enabled: false }
        ],
      },
    },
  }
};

export default preview;
