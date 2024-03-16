import { Meta, StoryFn } from "@storybook/react"
import React from "react"
import { Input, InputPropsType } from "./Input"

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
}

export default meta

const Template: StoryFn<InputPropsType> = (arg: any) => <Input {...arg} />

export const SimpleInput = Template.bind({})
SimpleInput.args = {
  value: "Simple Input",
}

export const ErrorInput = Template.bind({})
ErrorInput.args = {
  value: "Error Input",
  error: true,
}
