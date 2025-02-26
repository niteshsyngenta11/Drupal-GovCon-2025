import typographyData from "./typography.yml";
import typographyTwig from "./typography.twig";
import "./typography.scss";

export default {
  title: "Atoms/Typography",
};

export const Typography = () => typographyTwig(typographyData);
