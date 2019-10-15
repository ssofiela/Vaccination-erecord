import SELECTED_VACCINE from "../actions/vaccine";

const initialState = {
    name: ""
};

export const vaccineReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case SELECTED_VACCINE:
            return Object.assign({}, state, { name: action.vaccine });
        default:
            return state;
    }
};
