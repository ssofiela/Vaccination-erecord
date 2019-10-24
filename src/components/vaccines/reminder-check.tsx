import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

interface MainProps {
    sidebarOpen: boolean;
    children?: React.ReactNode;
}

const ReminderCheck: React.FC<MainProps> = () => {
    const [value, setValue] = React.useState("female");
    const [email, setEmail] = React.useState("No");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue((event.target as HTMLInputElement).value);
    };
    const addInput = (): void => {
        setEmail("Yes");
    };
    const removeInput = (): void => {
        setEmail("No");
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Turn on email reminder</FormLabel>
            <RadioGroup
                aria-label="position"
                name="position"
                value={value}
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
                            <input
                                type="text"
                                name="email"
                                defaultValue={"email@example.com"}
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
