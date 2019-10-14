export const componentIdFormatter = (
    componentName: string
): ((key: string) => string) => {
    return (key: string) => `vaccination_erecord_ui.${componentName}.${key}`;
};
