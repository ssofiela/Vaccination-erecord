import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { createStyles, InputLabel, Theme, withStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Box from "@material-ui/core/Box";
import { fade } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";

import { useStyles } from "./form-styles";
import { AutocompleteProps } from "@material-ui/lab/Autocomplete/Autocomplete";

interface ComboBoxProps {
    errorMessage?: string;
    error: boolean;
    id: string;
    name: string;
    options: OptionType[];
    placeholder?: string;
    required: boolean;
    tooltip?: string;
    editStatus: boolean;
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
                    borderColor: theme.palette.action.disabled
                }
            }
        }
    })
)(TextField);
type Props = ComboBoxProps & AutocompleteProps;

const ComboBox: React.FC<Props> = ({errorMessage, error, id, name, options, placeholder, required, tooltip, editStatus, ...props}) => {
    const classes = useStyles();
    return (
        <Autocomplete
            id={id}
            options={options}
            getOptionLabel={(option: OptionType) => option.label}
            {...props}
            renderInput={(params) => (
                <Box className={classes.container}>
                    <Box
                        className={classes.labelContainer}
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                    >
                        <InputLabel htmlFor={id} required={required}>
                            {name}
                        </InputLabel>
                        {tooltip && (
                            <Tooltip title={tooltip}>
                                <HelpOutlineOutlinedIcon
                                    style={{ fontSize: "1.2rem", color: "rgba(0, 0, 0, 0.54)" }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                    <StyledTextInput
                        placeholder={placeholder}
                        variant="outlined"
                        {...params}
                    />
                    {error && (
                        <FormHelperText className={classes.errorMessage}>
                            {errorMessage}
                        </FormHelperText>
                    )}
                </Box>
            )}
        />
    );
};

export default ComboBox;
