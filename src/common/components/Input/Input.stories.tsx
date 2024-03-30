import { Meta, StoryFn } from "@storybook/react"
import React from "react"
import { Input, Props } from "common/components/Input/Input"

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
}

export default meta

const Template: StoryFn<Props> = (arg: any) => <Input {...arg} />

export const SimpleInput = Template.bind({})
SimpleInput.args = {
  value: "Simple Input",
}

export const ErrorInput = Template.bind({})
ErrorInput.args = {
  value: "Error Input",
  error: true,
}
