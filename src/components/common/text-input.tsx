/* TODO
Import React from "react";
import { snakeCase } from "lodash";

import {componentIdFormatter} from "../../utils/component-id-formatter";

interface TextInputProps {
    name: string
    id: string
}

const parentComponentIdFormatter = (parentComponentName: string): ((id: string) => string) => {
    return componentIdFormatter(parentComponentName)
};

export const TextInput: React.FC<TextInputProps> = (props) => {
    /*const nameAsSnakeCase = snakeCase(props.name);
    const getId = (id: string) => {
        return parentComponentIdFormatter(id)
    };
    return <input type="text" id={/*getId(nameAsSnakeCase)""}/>
};*/
