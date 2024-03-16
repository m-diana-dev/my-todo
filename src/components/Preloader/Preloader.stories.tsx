import { Meta, StoryFn } from "@storybook/react"
import React from "react"
import { Preloader } from "./Preloader"

const meta: Meta<typeof Preloader> = {
  title: "Preloader",
  component: Preloader,
}

export default meta

const Template: StoryFn = () => <Preloader />

export const PreloaderLine = Template.bind({})
PreloaderLine.args = {}
