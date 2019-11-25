import React from "react";
import InputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";
import { fade, createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import { FormHelperText } from "@material-ui/core";

import { useStyles } from "./form-styles";

interface OwnProps {
    tooltip?: string;
    errorMessage?: string;
}

type TextInputProps = OwnProps & InputBaseProps;

const StyledInputField = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100% !important",
            minWidth: "none"
        },
        input: {
            border: `1.5px solid ${theme.palette.secondary.main}`,
            padding: "10px 12px",
            transition: theme.transitions.create(["border-color"]),
            "&:focus": {
                boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main
            },
            "&.Mui-disabled": {
                backgroundColor: theme.palette.action.disabledBackground,
                borderColor: theme.palette.action.disabled
            }
        }
    })
)(InputBase);

export const TextInput: React.FC<TextInputProps> = ({ tooltip, errorMessage, ...props }) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Box
                className={classes.labelContainer}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
            >
                <InputLabel
                    className={classes.label}
                    focused={false}
                    shrink={false}
                    required={props.required}
                >
                    {props.name}
                </InputLabel>
                {tooltip && (
                    <Tooltip title={tooltip}>
                        <HelpOutlineOutlinedIcon
                            style={{ fontSize: "1.2rem", color: "rgba(0, 0, 0, 0.54)" }}
                        />
                    </Tooltip>
                )}
            </Box>
            <StyledInputField rows={2} id={props.id} {...props} />
            {props.error && (
                <FormHelperText className={classes.errorMessage}>{errorMessage}</FormHelperText>
            )}
        </Box>
    );
};

export default TextInput;
