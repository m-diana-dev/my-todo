import { Meta, StoryFn } from "@storybook/react"
import React from "react"
import { PreloaderCircle } from "./PreloaderCircle"

const meta: Meta<typeof PreloaderCircle> = {
  title: "Preloader",
  component: PreloaderCircle,
}

export default meta

const Template: StoryFn = () => <PreloaderCircle />

export const Preloader_Circle = Template.bind({})
Preloader_Circle.args = {}
