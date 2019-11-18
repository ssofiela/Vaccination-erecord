import React from "react";
import InputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";
import { fade, createStyles, Theme, withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import { FormHelperText } from "@material-ui/core";

interface OwnProps {
    tooltip?: string;
    errorMessage?: string;
}

type TextInputProps = OwnProps & InputBaseProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        labelContainer: {
            marginBottom: theme.spacing(1)
        },
        tooltip: {
            color: "#00000054"
        },
        errorMessage: {
            color: theme.palette.error.main
        },
        required: {
            color: theme.palette.error.main
        }
    })
);

const StyledInputField = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%"
        },
        input: {
            position: "relative",
            border: `1.5px solid ${theme.palette.secondary.main}`,
            padding: "10px 12px",
            transition: theme.transitions.create(["border-color"]),
            "&:focus": {
                boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main
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
                <InputLabel htmlFor={props.id} required={props.required}>
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
            <StyledInputField id={props.id} {...props} />
            {props.error && (
                <FormHelperText className={classes.errorMessage}>{errorMessage}</FormHelperText>
            )}
        </Box>
    );
};

export default TextInput;
