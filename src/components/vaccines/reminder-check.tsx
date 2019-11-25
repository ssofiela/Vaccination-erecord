import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useTheme } from "@material-ui/core";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { TextInput } from "../common/form-input";

interface OwnProps {
    onChangeEmail: (value: string) => void;
    onChangeRadio: (value: boolean) => void;
    error: boolean;
    radioValue: boolean;
    inputValue?: string;
    tooltip?: string;
    errorMessage?: string;
    required?: boolean;
    name: string;
    id: string;
}

type Props = OwnProps & RadioGroupProps;

const ReminderCheck: React.FC<Props> = (props) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(props.radioValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = (event.target as HTMLInputElement).value === "true";
        setValue(newValue);
        if (!newValue) {
            props.onChangeEmail("");
        }
        props.onChangeRadio(newValue);
    };

    return (
        <Box style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <InputLabel required={props.required}>{props.name}</InputLabel>
                        {props.tooltip && (
                            <Tooltip title={props.tooltip}>
                                <HelpOutlineOutlinedIcon
                                    style={{ fontSize: "1.2rem", color: "rgba(0, 0, 0, 0.54)" }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                </Grid>
                <FormControl hiddenLabel fullWidth component="fieldset">
                    <RadioGroup value={value} onChange={handleChange}>
                        <Box display="flex" flexDirection="column">
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    value={true}
                                    control={<Radio color="primary" />}
                                    label="Yes"
                                />
                            </Grid>
                            {value && (
                                <Grid item xs={12} sm={6}>
                                    <TextInput
                                        onChange={(event) => {
                                            props.onChangeEmail(event.target.value);
                                        }}
                                        required={Boolean(value)}
                                        value={props.inputValue}
                                        name="Email for reminder"
                                        error={props.error}
                                        errorMessage={props.errorMessage}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    value={false}
                                    control={<Radio color="primary" />}
                                    label="No"
                                />
                            </Grid>
                        </Box>
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Box>
    );
};

export default ReminderCheck;
