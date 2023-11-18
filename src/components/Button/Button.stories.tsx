import {BtnPropsType, Button} from "./Button";
import {Meta, StoryFn} from "@storybook/react";
import del from "../../image/delete.svg";
import add from "../../image/add.svg";
import React from "react";


const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
    argTypes: {
        children: {
            name: 'label',
            defaultValue: 'Click me!'
        }
    }
}


export default meta;

const Template: StoryFn<BtnPropsType> = (arg: any) => <Button {...arg}/>

export const FilterButton = Template.bind({})
FilterButton.args = {
    children: 'Active'
}

export const DeleteButton = Template.bind({})
DeleteButton.args = {
    children: <img src={del} alt="icon"/>,
    round: true
}

export const AddButton = Template.bind({})
AddButton.args = {
    children: <img src={add} alt="icon"/>,
    round: true
}