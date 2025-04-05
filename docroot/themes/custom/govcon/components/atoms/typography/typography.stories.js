import typographyData from "./typography.yml";
import typographyTwig from "./typography.twig";

export default {
  title: "Atoms/Typography",
};

export const Typography = () => typographyTwig(typographyData);
