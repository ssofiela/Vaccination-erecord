import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { createStyles, InputLabel, Theme, withStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Box from "@material-ui/core/Box";
import { fade } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";

import { TextInput } from "./text-input";
import { useStyles } from "./form-styles";

interface ComboBoxProps {
    errorMessage?: string;
    error?: boolean;
    id: string;
    name: string;
    options: OptionType[];
    placeholder?: string;
    required?: boolean;
    tooltip?: string;
    isEditable: boolean;
    value: OptionType;
    onChange: (option: OptionType) => void;
}

export interface OptionType {
    label: string;
    value: string;
}

const StyledTextInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            "& .MuiOutlinedInput-root": {
                padding: "0.5px 8px",
                "& fieldset": {
                    border: `1.5px solid ${theme.palette.secondary.main}`,
                    transition: theme.transitions.create(["border-color"])
                },
                "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`
                },
                "&.Mui-focused fieldset": {
                    boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                    borderColor: theme.palette.primary.main
                },
                "&.Mui-disabled fieldset": {
                    backgroundColor: theme.palette.action.disabledBackground,
                    borderColor: theme.palette.action.disabled,
                    color: theme.palette.action.disabled
                },
                "&.Mui-disabled:hover fieldset": {
                    boxShadow: "none",
                    borderColor: theme.palette.action.disabled
                }
            }
        }
    })
)(TextField);
type Props = ComboBoxProps;

const ComboBox: React.FC<Props> = (props) => {
    const classes = useStyles();
    return props.isEditable ? (
        <Autocomplete
            disabled={!props.isEditable}
            id={props.id}
            options={props.options}
            getOptionLabel={(option: OptionType) => option.label}
            disableClearable
            value={props.value}
            onChange={(_event, option) => {
                props.onChange(option);
            }}
            renderInput={(params) => (
                <Box className={classes.container}>
                    <Box
                        className={classes.labelContainer}
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                    >
                        <InputLabel htmlFor={props.id} required={props.required}>
                            {props.name}
                        </InputLabel>
                        {props.tooltip && (
                            <Tooltip title={props.tooltip}>
                                <HelpOutlineOutlinedIcon
                                    style={{ fontSize: "1.2rem", color: "rgba(0, 0, 0, 0.54)" }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                    <StyledTextInput
                        placeholder={props.placeholder}
                        variant="outlined"
                        {...params}
                    />
                    {props.error && (
                        <FormHelperText className={classes.errorMessage}>
                            {props.errorMessage}
                        </FormHelperText>
                    )}
                </Box>
            )}
        />
    ) : (
        <TextInput
            placeholder={props.placeholder}
            disabled={!props.isEditable}
            value={props.value.label}
            name={props.name}
        />
    );
};

export default ComboBox;
