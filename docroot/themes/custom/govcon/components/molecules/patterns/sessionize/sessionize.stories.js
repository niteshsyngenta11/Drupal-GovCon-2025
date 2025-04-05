import htmlComponent from "./sessionize.twig";

export default {
  title: "Molecules/Patterns/Section/Sessionize",
};

const Component = (args) => htmlComponent(args);

export const Speakers = Component.bind({});
Speakers.args = { sessionize_type: "speakers" };

export const Schedule = Component.bind({});
Schedule.args = { sessionize_type: "schedule" };
