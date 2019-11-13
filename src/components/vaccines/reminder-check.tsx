import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

interface MainProps {
    sidebarOpen: boolean;
    children?: React.ReactNode;
    updateEmailRemainder: any;
    updateEmail: any;
}

const ReminderCheck: React.FC<MainProps> = props => {
    const [value, setValue] = React.useState("female");
    const [email, setEmail] = React.useState("No");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue((event.target as HTMLInputElement).value);
    };
    const addInput = (): void => {
        setEmail("Yes");
        props.updateEmailRemainder("Yes");
    };
    const removeInput = (): void => {
        setEmail("No");
        props.updateEmailRemainder("No");
    };

    const changeEmail = (email: string): void => {
        props.updateEmail(email);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Turn on email reminder</FormLabel>
            <RadioGroup
                aria-label="position"
                name="position"
                value={email}
                onChange={handleChange}
            >
                <FormControlLabel
                    value="Yes"
                    control={<Radio color="primary" />} // Changes color to "#f9f9f9"
                    label="Yes"
                    onChange={addInput}
                    labelPlacement="end"
                />
                {email == "Yes" ? (
                    <form>
                        <label>
                            email:
                            <input
                                type="text"
                                name="email"
                                onChange={event =>
                                    changeEmail(event.target.value)
                                }
                            />
                        </label>
                    </form>
                ) : null}
                <FormControlLabel

                    value="No"
                    control={<Radio color="primary" />} // Changes color to "#f9f9f9"
                    label="No"
                    onChange={removeInput}
                    labelPlacement="end"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default ReminderCheck;
