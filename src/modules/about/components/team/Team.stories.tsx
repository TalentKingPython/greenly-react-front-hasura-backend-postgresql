import React from "react";
import { Story, Meta } from "@storybook/react";
import { Team, ITeamProps } from "./Team";


export default {
  title: "Home/Team",
  component: Team,
  argTypes: {},
} as Meta;

const Template: Story<ITeamProps> = (args) => <Team {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
};