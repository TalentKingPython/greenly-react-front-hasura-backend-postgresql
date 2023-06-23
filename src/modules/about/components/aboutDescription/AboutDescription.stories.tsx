import React from "react";
import { Story, Meta } from "@storybook/react";
import { AboutDescription, IAboutDescriptionProps } from "./AboutDescription";


export default {
  title: "Home/AboutDescription",
  component: AboutDescription,
  argTypes: {},
} as Meta;

const Template: Story<IAboutDescriptionProps> = (args) => <AboutDescription {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
};
