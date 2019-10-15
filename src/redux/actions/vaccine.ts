export const Type = {
    SELECTED_VACCINE: "SELECTED_VACCINE"
};

export const addVaccineName = (name: string): any => {
    return {
        type: Type.SELECTED_VACCINE,
        payload: name
    };
};

export default Type;

