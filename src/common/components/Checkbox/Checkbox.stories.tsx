import { Meta, StoryFn } from "@storybook/react"
import React from "react"
import { Checkbox, Props } from "common/components/Checkbox/Checkbox"
import "app/App.css"

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    children: {
      name: "label",
      defaultValue: "Click me!",
    },
  },
}

export default meta

const Template: StoryFn<Props> = (arg: any) => <Checkbox {...arg} />

export const SimpleCheckbox = Template.bind({})
SimpleCheckbox.args = {}

export const SimpleCheckedCheckbox = Template.bind({})
SimpleCheckedCheckbox.args = {
  checked: true,
}

export const CheckboxWithLabel = Template.bind({})
CheckboxWithLabel.args = {
  label: "Remember me",
}

export const CheckedCheckboxWithLabel = Template.bind({})
CheckedCheckboxWithLabel.args = {
  label: "Remember me",
  checked: true,
}
